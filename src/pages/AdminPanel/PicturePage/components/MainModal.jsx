import { useState } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  Button,
  Form,
  Upload,
  notification,
  Space,
  message,
  Select,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Api from "../../../../api";

const { Option } = Select;

const MainModal = ({
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
      if (file && typeof file.size === "number") {
        const isLt10M = file.size / 1024 / 1024 < 10; // 10MB
        if (!isLt10M) {
          message.error(`${file.name} must be less than 10MB!`);
          return Upload.LIST_IGNORE;
        }
      } else {
        message.error("Error determining file size.");
        return Upload.LIST_IGNORE;
      }

      if (fileList.length >= 1) {
        message.error("You can only upload one file!");
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

  const onFinish = async (value) => {
    const formData = new FormData();
    const file = fileList[0];
    if (file) {
      formData.append("photo", fileList[0].originFileObj);
      formData.append("type", value.type);
    }

    try {
      const response = await Api.post("/photo/add", formData);
      if (response.data.data) {
        notification.success({
          message: "Success",
          description: "Data has been successfully submitted!",
        });
      }
      handleCancel();
      refreshData();
    } catch (error) {
      notification.error({
        message: "Error",
        description:
          "An error occurred while submitting the data. Please try again.",
      });
      console.error("Failed:", error);
    }
  };

  /* Function called when there is an error in form submission */
  const onFinishFailed = (errorInfo) => {
    notification.error({
      message: "Form Error",
      description: "Please enter the information correctly!",
    });
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add Image
      </Button>

      <Modal
        title="Add Image"
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
            label="Image"
            name="photo"
            rules={[{ required: true, message: "Please upload a file!" }]}
          >
            <Upload {...uploadProps} accept="image/*">
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            label="Type"
            name="type"
            rules={[
              { required: true, message: "Please select an image type!" },
            ]}
          >
            <Select placeholder="Select image type">
              <Option key="1" value="1">
                Gorizontal
              </Option>
              <Option key="2" value="2">
                Vertical
              </Option>
            </Select>
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

MainModal.propTypes = {
  isModalVisible: PropTypes.bool.isRequired,
  showModal: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  refreshData: PropTypes.func.isRequired,
};

export default MainModal;
