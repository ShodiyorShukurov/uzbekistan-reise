import  { useState } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  Button,
  Form,
  Upload,
  notification,
  Space,
  message,
  Select
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Api from "../../../../api";

const {Option}= Select

const MainModal = ({ isModalVisible, showModal, handleCancel, refreshData }) => {
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();

  /** Upload props */
  const uploadProps = {
    beforeUpload: (file) => {
      if (file && typeof file.size === "number") {
        const isLt10M = file.size / 1024 / 1024 < 10; // 10MB
        if (!isLt10M) {
          message.error(`${file.name} rasm 10MB dan katta bo'lmasligi kerak!`);
          return Upload.LIST_IGNORE;
        }
      } else {
        message.error("Fayl hajmini aniqlashda xato yuz berdi.");
        return Upload.LIST_IGNORE;
      }

      if (fileList.length >= 1) {
        message.error("Faqat bitta fayl yuklash mumkin!");
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
          message: "Muvaffaqiyatli",
          description: "Ma'lumot muvaffaqiyatli yuborildi!",
        });
      }
      handleCancel();
      refreshData()
    } catch (error) {
      notification.error({
        message: "Xatolik",
        description:
          "Ma'lumot yuborishda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.",
      });
      console.error("Failed:", error);
    }
  };

  /* Formani yuborishda xato yuz berishida chaqiriladigan funksiya */
  const onFinishFailed = (errorInfo) => {
    notification.error({
      message: "Formada xatolik",
      description: "Iltimos, ma'lumotlarni to'g'ri kiriting!",
    });
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Rasm qo&apos;shish
      </Button>

      <Modal
        title="Rasm qo'shish"
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
            label="Rasm"
            name="photo"
            rules={[{ required: true, message: "Iltimos, faylni yuklang!" }]}
          >
            <Upload {...uploadProps} accept="image/*">
              <Button icon={<UploadOutlined />}>Yuklash uchun bosing</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            label="Type"
            name="type"
            rules={[{ required: true, message: "Iltimos, rasm tipini tanglang!" }]}
          >
            <Select placeholder="Rasm tipini tanglang">
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
                Yuborish
              </Button>
              <Button type="primary" danger onClick={handleCancel}>
                Bekor qilish
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
