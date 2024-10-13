import { useState } from "react";
import {
  Modal,
  Button,
  Form,
  Upload,
  notification,
  Space,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Api from "../../../../api";
import PropTypes from "prop-types";

const CarouselModal = ({
  isModalVisible,
  showModal,
  handleCancel,
  refreshData,
}) => {
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();

  /** Upload props */
  const uploadProps = {
    beforeUpload: (file) => {
      // if (file && typeof file.size === "number") {
      //   const isLt10M = file.size / 1024 / 1024 < 10; // 10MB
      //   if (!isLt10M) {
      //     message.error(`${file.name} must be less than 10MB!`);
      //     return Upload.LIST_IGNORE;
      //   }
      // } else {
      //   message.error("Error determining file size.");
      //   return Upload.LIST_IGNORE;
      // }

      if (fileList.length >= 1) {
        message.error("Only one file can be uploaded!");
        return Upload.LIST_IGNORE;
      }

      // Update the file list state
      setFileList([file]);
      return false; // Prevent auto upload
    },
    fileList,
    onChange: (info) => {
      setFileList(info.fileList);
    },
  };

  const onFinish = async () => {
    const formData = new FormData();
    formData.append("photo", fileList[0].originFileObj);

    try {
      const response = await Api.post("/carousel/add", formData);
      if (response.data.data) {
        notification.success({
          message: "Success",
          description: "Data submitted successfully!",
        });
      }
      handleCancel();
      refreshData();
    } catch (error) {
      notification.error({
        message: "Error",
        description:
          "There was an error submitting the data. Please try again.",
      });
      console.error("Failed:", error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    notification.error({
      message: "Form Error",
      description: "Please enter the data correctly!",
    });
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add a Picture
      </Button>

      <Modal
        title="Add Picture"
        open={isModalVisible}
        onCancel={handleCancel}
        style={{ top: 20 }}
        footer={false}
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="on"
        >
          <Form.Item
            label="Picture"
            name="attachment"
            rules={[{ required: true, message: "Please upload a file!" }]}
          >
            <Upload {...uploadProps} accept="image/*">
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Space size="large">
              <Button htmlType="submit" type="primary">
                Submit
              </Button>
              <Button type="primary" danger onClick={handleCancel}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

CarouselModal.propTypes = {
  isModalVisible: PropTypes.bool.isRequired,
  showModal: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  refreshData: PropTypes.func.isRequired,
};

export default CarouselModal;
