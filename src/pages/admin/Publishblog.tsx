import { useEffect, useReducer, useState } from "react";
import styles from "@/styles/publish.module.css";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import Image from "next/image";
import successlogo from "@/resources/successicon.png";
import axios from "axios";
import AdminRoute from "./AdminRoute";
import Admin from ".";
import AdminNav from "../../components/AdminNav";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { DetailedblogPublish } from "@/Interfaces/Blogs";
import errorlogo from '@/resources/error.png'
const Publishblog = () => {
  const { quill, quillRef }: any = useQuill();
  const [selectedImage, setSelectedImage] = useState(null);
  const [limitexceed, setLimitexceed] = useState<boolean>(false);
  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);
  const [successLoader,setSuccessLoader]=useState<boolean>(false);
  const [successMessage,setSuccessMessage]=useState<boolean>(false);
  const [errorMessage,setErrorMessage]=useState<boolean>(false);
  const [proceedMessage,setProceedMessage]=useState<boolean>(false);
  const [formData, setFormData] = useState<DetailedblogPublish>({
    title: "",
    publishDate: "",
    image: "",
    category: "0",
    description: "",
    bodycontent: "",
  });
  useEffect(() => {
    if (quill) {
      quill.on("text-change", (delta: any, oldDelta: any, source: any) => {
        setFormData((prevState: any) => ({
          ...prevState,
          bodycontent: quillRef.current.firstChild.innerHTML,
        }));
      });
    } else {
      forceUpdate();
    }
  }, [quill, reducerValue]);
  const handleInputChange = async (e: any) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      setSelectedImage(file);
      if (file) {
        const reader: any = new FileReader();
        reader.onloadend = () => {
          console.log(reader.result);
          setFormData((prevState: any) => ({
            ...prevState,
            image: reader.result,
          }));
        };
        reader.readAsDataURL(file);
      }
    } else {
      const { name, value } = e.target;
      setFormData((prevState: any) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  const handleSuccess=(e:any)=>{
    setSuccessLoader(true);
                  axios
                    .post("../api/Blogs", formData)
                    .then(() => {
                      console.log("posted successfully!");
                      setSuccessMessage(true);
                      setProceedMessage(false);
                    })
                    .catch((err) => {
                      console.log("Something went wrong!");
                      setErrorMessage(true);
                      setProceedMessage(false);
                    })
                    .finally(()=>{
                      setSuccessLoader(false);
                    })
  }
  const handlePublish = (e: any) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    const sizeof = require("sizeof");
    const objectSizeBytes = sizeof.sizeof(formData);
    const objectSizeMB = objectSizeBytes / (1024 * 1024); // Convert bytes to megabytes
    console.log(objectSizeMB);
    if (objectSizeMB <= 100) {
      setLimitexceed(false);
      setProceedMessage(true);
    } else {
      console.log("Limit exceeded");
      setLimitexceed(true);
    }
  };
  return (
    <AdminRoute>
      <Admin />
      <div className={"admin_nav_adjustment"}>
        <AdminNav />
        <div>
        {proceedMessage?<div className={styles.publishalert}>
          <div className={styles.publish_conformation}>
            <p>Are you sure you want to publish this post ?</p>
            <div className={styles.publish_alert_buttons}>
              <button
                className={styles.publish_alert_button1}
                onClick={() => {
                  setProceedMessage(false);
                }}
              >
                No
              </button>
              {successLoader?<button
                className={styles.publish_alert_button2}>Wait <FontAwesomeIcon icon={faSpinner} className="fa-spin" /></button>:<button
                className={styles.publish_alert_button2}
                onClick={handleSuccess}
              >
                Yes
              </button>}
            </div>
          </div>
        </div>:<></>}
          {successMessage?<div className={styles.publish_confirm_alert}>
                          <div className={styles.publish_confirm_redirection}>
                            <Image src={successlogo} alt="" />
                            <p>This product has been posted successfully!</p>
                            <button
                              onClick={() => {
                                document.location.href =
                                  "/admin/Blogs";
                              }}
                            >
                              Done
                            </button>
                          </div>
                        </div>:<></>}
          {errorMessage?<div className={styles.publish_confirm_alert}>
                          <div className={styles.publish_confirm_redirection}>
                            <Image src={errorlogo} alt="" />
                            <p>Something gone wrong! Try again later.</p>
                            <button
                              onClick={() => {
                                document.location.href =
                                  "/admin/products/Inventory";
                              }}
                            >
                              OK
                            </button>
                          </div>
                        </div>:<></>}
          <div className={styles.publish_post_form_container}>
            <form onSubmit={handlePublish}>
              <div className={styles.publish_post_form_container_leftbox}>
                <div>
                  Title:
                  <div>
                    <input
                      className={styles.publish_blog_input}
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div>
                  Publish Date:
                  <div>
                    <input
                      className={styles.publish_blog_input}
                      type="date"
                      name="publishDate"
                      value={formData.publishDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div>
                  Image:
                  <div>
                    <input
                      className={styles.publish_blog_input}
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div>
                  Summary:
                  <div>
                    <textarea
                      className={styles.publish_blog_textarea}
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                {limitexceed ? (
                  <p>Exceeded the maximum upload limit i.e 100MB</p>
                ) : (
                  <></>
                )}
                <div>
                  <button type="submit" className={styles.publish_blog_submit}>
                    Publish
                  </button>
                </div>
              </div>
            </form>
            <div className={styles.quilljs}>
              <div ref={quillRef} />
            </div>
          </div>
        </div>
      </div>
    </AdminRoute>
  );
};
export default Publishblog;
