import { useEffect, useReducer, useState } from "react";
import styles from "@/styles/publish.module.css";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import Image from "next/image";
import successlogo from "@/resources/successicon.png";
import axios from "axios";
import { useRouter } from "next/router";
import AdminRoute from "@/pages/admin/AdminRoute";
import Admin from ".";
import AdminNav from "../../components/AdminNav";
import React from "react";
import { Detailedblog } from "@/Interfaces/Blogs";
import errorlogo from '@/resources/error.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
const Editblog = () => {
  const router = useRouter();
  let Blogid = router.query.Blogid;
  const [formData, setFormData] = useState<Detailedblog>({
    title: "",
    publishDate: "",
    image: "",
    category: "",
    description: "",
    bodycontent: "",
    comments: [],
  });
  const { quill, quillRef }: any = useQuill();
  const [selectedImage, setSelectedImage] = useState(null);
  const [initialContent, setInitialContent] = useState("");
  const [limitexceed, setLimitexceed] = useState(false);
  const [successLoader,setSuccessLoader]=useState<boolean>(false);
  const [successMessage,setSuccessMessage]=useState<boolean>(false);
  const [errorMessage,setErrorMessage]=useState<boolean>(false);
  const [proceedMessage,setProceedMessage]=useState<boolean>(false);
  useEffect(() => {
    if (quill) {
      quill.on("text-change", (delta: any, oldDelta: any, source: any) => {
        setFormData((prevState: any) => ({
          ...prevState,
          bodycontent: quillRef.current.firstChild.innerHTML,
        }));
      });
    }
  }, [quill]);
  const fetchData = () => {
    if (Blogid) {
      axios
        .get(`../../api/Blogs/${Blogid}`)
        .then((res) => {
          setFormData(res.data);
          setInitialContent(res.data.bodycontent);
          const delta = quill.clipboard.convert(res.data.bodycontent);
          quill.setContents(delta);
          console.log(formData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  useEffect(() => {
    fetchData();
  }, [Blogid, initialContent, quill]);
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
                  .patch(`../api/Blogs/${Blogid}`, formData)
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
        <div>
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
                    />
                  </div>
                </div>
                <div>
                  Description:
                  <div>
                    <textarea
                      className={styles.publish_blog_textarea}
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
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
          {formData.comments.length !== 0 ? (
            <div className={styles.comments_edit}>
              <h5
                style={{
                  textAlign: "center",
                  fontSize: "15px",
                  margin: "15px",
                }}
              >
                Comments
              </h5>

              <table>
                <thead>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Comment</th>
                  <th>Options</th>
                </thead>
                <tbody>
                  {formData.comments.map((item: any, index: number) => {
                    return (
                      <tr key={index}>
                        <td>{item._id}</td>
                        <td>{item.name}</td>
                        <td>{item.publishDate}</td>
                        <td>{item.comment}</td>
                        <td>
                          <button
                            onClick={() => {
                              try {
                                axios
                                  .delete(
                                    `/api/Blogs/${Blogid}/comments/${item._id}`
                                  )
                                  .then((res) => {
                                    console.log("Successfully deleted");
                                    fetchData();
                                  })
                                  .catch((err) => {
                                    console.log("Something went wrong!");
                                  });
                              } catch (err) {
                                if (window) {
                                  window.alert("Something went wrong");
                                }
                              }
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <p style={{ textAlign: "center" }}>No comments!</p>
          )}
        </div>
      </div>
    </AdminRoute>
  );
};
export default Editblog;
