import { Modal, Button, Form, Input, Upload, Select, Space } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "../ckeditor.css";
import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "../tour.css";
import { API_PATH, API_TOKEN } from "../../../utils/constants";

const { Option } = Select;

const FullScreenModalWithSecondaryModal = ({ ...props }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isFullScreenModalVisible, setIsFullScreenModalVisible] =
    useState(false);
  const [fileList, setFileList] = useState([]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  // Birinchi modalni yopish va to'liq ekran modalini ko'rsatish
  const handleOk = (values) => {
    console.log("Form Submitted:", values);
    const body = new FormData();

    console.log(values.file.file);
    body.append("photo", values.file.file);
    body.append("location", values.location);
    body.append("day", values.day);
    body.append("country_id", 1);
    console.log(...body);
    try {
      fetch(API_PATH + "/tour/add", {
        method: "post",
        body: body,
        header: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) =>
          // console.log(data)
          localStorage.setItem("tour", data.data.id)
        );
    } catch (error) {
      console.log(error);
    }
    setIsModalVisible(false); // Birinchi modalni yopish
    setIsFullScreenModalVisible(true); // To'liq ekran modalni ochish
  };

  // Modalni yopish
  const handleCancel = () => {
    setIsModalVisible(false);
    setIsFullScreenModalVisible(false); // To'liq ekran rejimidan chiqish
  };
  // Faylni upload qilinmasligini ta'minlash uchun
  const beforeUpload = (file) => {
    setFileList([file]); // Fayl obyektini saqlash
    return false; // Upload qilinmasligini ta'minlash
  };

  /!* Html editor/;
  const imageConfiguration = {
    resizeOptions: [
      {
        name: "resizeImage:original",
        value: null,
        label: "Original",
      },
      {
        name: "resizeImage:40",
        value: "40",
        label: "40%",
      },
      {
        name: "resizeImage:60",
        value: "60",
        label: "60%",
      },
    ],
    toolbar: ["resizeImage"],
  };
  const [data, setdata] = useState("");
  const [news, setnews] = useState([]);

  const onReady = (editor) => {
    if (editor.model.schema.isRegistered("image")) {
      editor.model.schema.extend("image", { allowAttributes: "blockIndent" });
    }
  };

  function uploadAdapter(loader) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const id = window.localStorage.getItem("tour");

          const found = news.find((e) => e.id == id);
          console.log("test", id, found);
          const body = new FormData();
          console.log(...body);
          loader.file.then((file) => {
            body.append("photo", file);
            fetch(`${API_PATH}/tour/upload`, {
              method: "post",
              body: body,
            })
              .then((res) => res.json())
              .then((res) => {
                console.log(res);
                if (found) {
                  console.log("found");
                  found.image.push(res.data);
                  console.log(news);
                } else {
                  console.log("a");
                  const tour = {
                    id: id,
                    image: [res.data],
                  };
                  news.push(tour);
                  console.log(news);
                }

                resolve({
                  default: `${res.data}`,
                });
              })
              .catch((err) => {
                reject(err);
              });
          });
        });
      },
    };
  }

  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  }

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>

      {/* Birinchi modal */}
      <Modal
        title="Upload File and Title"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form layout="vertical" onFinish={(values) => handleOk({ ...values })}>
          <Form.Item
            name="country_id"
            label="Mamlakat"
            rules={[{ required: true, message: "Iltimos mamlakatni tanlang!" }]}
          >
            <Select placeholder="Mamlakatni tanlang">
              <Option key="id" value="id">
                dasjh
              </Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="location"
            label="Joylashgan joyi"
            rules={[
              { required: true, message: "Iltimos joylashuvni kiriting!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="day"
            label="Sayohat davomiyligi"
            rules={[
              {
                required: true,
                message: "Iltimos sayohat davomiyligi kiriting!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="file"
            label="Rasm yuklang"
            rules={[{ required: true, message: "Iltimos rasm yuklang!" }]}
          >
            <Upload beforeUpload={beforeUpload} maxCount={1}>
              <Button icon={<UploadOutlined />}>Rasm yuklash</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Space size="large">
              <Button type="primary" htmlType="submit">
                Yuborish
              </Button>

              <Button type="primary" danger onClick={handleCancel}>
                Bekor qilish
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* To'liq ekran modal */}
      <Modal
        title="Full Screen Modal"
        open={isFullScreenModalVisible}
        onCancel={handleCancel}
        footer={null}
        style={{ top: 0, height: "100vh" }}
        width="100vw"
        height="100vh"
      >
        <div className="App">
          <CKEditor
            style={{ height: "100vh" }}
            config={
              ({
                ckfinder: {
                  uploadUrl: API_PATH + "/tour/upload/",
                },
                image: {
                  // Configure the available styles.
                  styles: [
                    "alignLeft",
                    "alignCenter",
                    "alignRight",
                    "resizeImage",
                  ],

                  resizeOptions: [
                    {
                      name: "resizeImage:original",
                      label: "Original",
                      value: null,
                    },
                    {
                      name: "resizeImage:25",
                      value: "25",
                      icon: "small",
                    },
                    {
                      name: "resizeImage:50",
                      label: "50%",
                      value: "50",
                    },
                    {
                      name: "resizeImage:75",
                      label: "75%",
                      value: "75",
                    },
                  ],

                  toolbar: [
                    "resizeImage:25",
                    "resizeImage:50",
                    "resizeImage:75",
                    "resizeImage:original",
                    "imageStyle:alignLeft",
                    "imageStyle:alignCenter",
                    "imageStyle:alignRight",
                    "|",
                    "resizeImage",
                    "|",
                    "imageTextAlternative",
                  ],
                },
              },
              {
                extraPlugins: [uploadPlugin],
              })
            }
            editor={ClassicEditor}
            onReady={(editor) => onReady(editor)}
            onBlur={(event, editor) => {}}
            onFocus={(event, editor) => {}}
            onChange={(event, editor) => {
              const data = editor.getData();
              setdata(data);
            }}
            {...props}
          />
        </div>

        <Button
          type="primary"
          style={{ marginTop: "10px" }}
          htmlType="submit"
          onClick={(evt) => {
            evt.preventDefault();
            const images = news.find(
              (e) => e.id == window.localStorage.getItem("tour")
            );

            if (images && images.image && images.image.length > 0) {
              fetch(API_PATH + `/tour/add/data`, {
                headers: {
                  "Content-Type": "application/json",
                  token: localStorage.getItem(API_TOKEN),
                },
                method: "PUT",
                body: JSON.stringify({
                  id: localStorage.getItem("tour"),
                  data: data,
                  images: images.image, // Faqat image array jo'natiladi
                }),
              })
                .then((res) => res.json())
                .then((data) => {
                  if (data) handleCancel();
                });
            } else {
              console.error("Image array bo'sh yoki topilmadi!");
            }
          }}
        >
          Submit
        </Button>
      </Modal>
    </>
  );
};

export default FullScreenModalWithSecondaryModal;
