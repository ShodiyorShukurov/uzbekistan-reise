import { useEffect } from "react";
import { Modal, Button, Form, notification, Space, Input } from "antd";
import PropTypes from "prop-types"; 
import Api from "../../../../api";

const CountryModal = ({
  isModalVisible,
  showModal,
  handleCancel,
  selectItem,
  refreshData
}) => {
  const [form] = Form.useForm();
console.log(selectItem)

  useEffect(() => {
    if (isModalVisible) {
      if (selectItem && Object.keys(selectItem).length > 0) {
        form.setFieldsValue({
          name: selectItem.country || "", 
        });
      } else {
        form.resetFields();
      }
    }
  }, [isModalVisible, selectItem, form]);

  const onFinish = async (value) => {
    let data = {
      name: value.name,
    };

    try {
      if (selectItem && selectItem.id) {
        data.id = selectItem.id;
        const response = await Api.put(`/country/edit`, data);
        if (response.data.data) {
          notification.success({
            message: "Muvaffaqiyatli",
            description: "Ma'lumot muvaffaqiyatli yangilandi!",
          });
        }
      } else {
        // If no id, use POST method
        const response = await Api.post("/country/add", data);
        if (response.data.data) {
          notification.success({
            message: "Muvaffaqiyatli",
            description: "Ma'lumot muvaffaqiyatli yuborildi!",
          });
        }
      }
      refreshData()
      handleCancel(); // Close the modal after success
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
        Mamlakat qo&apos;shish
      </Button>

      <Modal
        title="Mamlakat qo'shish"
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
            label="Mamlakat nomini kiriting"
            name="name"
            rules={[
              { required: true, message: "Iltimos, mamlakat nomini kiriting!" },
            ]}
          >
            <Input />
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

// Add PropTypes validation for the props
CountryModal.propTypes = {
  isModalVisible: PropTypes.bool.isRequired,
  showModal: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  refreshData: PropTypes.func.isRequired,
  selectItem: PropTypes.shape({
    id: PropTypes.string, // Assuming id is a string, change to number if necessary
    name: PropTypes.string,
  }), // Updated to shape
};

export default CountryModal;
