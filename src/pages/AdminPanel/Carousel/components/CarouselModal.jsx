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
      //     message.error(`${file.name} rasm 10MB dan katta bo'lmasligi kerak!`);
      //     return Upload.LIST_IGNORE;
      //   }
      // } else {
      //   message.error("Fayl hajmini aniqlashda xato yuz berdi.");
      //   return Upload.LIST_IGNORE;
      // }

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

  const onFinish = async () => {
    const formData = new FormData();
    formData.append("photo", fileList[0].originFileObj);

    try {
      const response = await Api.post("/carousel/add", formData);
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
            name="attachment"
            rules={[{ required: true, message: "Iltimos, faylni yuklang!" }]}
          >
            <Upload {...uploadProps} accept="image/*">
              <Button icon={<UploadOutlined />}>Yuklash uchun bosing</Button>
            </Upload>
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


CarouselModal.propTypes = {
  isModalVisible: PropTypes.bool.isRequired,
  showModal: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  refreshData: PropTypes.func.isRequired,
};

export default CarouselModal;
