import { useRouter } from "next/router";
import classes from "@/styles/shlok.module.css";
import Image from "next/image";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IoPause } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import { getShlokas } from "@/Books_PDFs/Shlok/others-shloks.js";
import { BsRecord2 } from "react-icons/bs";
import { FaRegPlayCircle, FaRegStopCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { getShlokasMovements } from "@/Books_PDFs/Shlok/pre-recorded";
import { getSingleShlokData } from "@/lib/storage";

export default function Shlok() {
  const router = useRouter();
  const slug = router.query.slug;
  const [shlok, setShlok] = useState(null);
  const [shlokNo, setShlokNo] = useState(0);
  const [shlokSettings, setShlokSettings] = useState(0);
  const [shlokMovement, setShlokMovement] = useState([]);
  const [customMovements, setCustomMovements] = useState(null);
  const [shlokCustomMovement, setShlokCustomMovement] = useState([]);
  const [timeFrames, setTimeFrames] = useState([]);
  const isMovementStoppedRef = useRef(false); // Use a ref instead of state
  const isMovementEndedRef = useRef(false); // Use a ref instead of state
  const inputRef = useRef(null);
  const [selectedTitle, setSelectedTitle] = useState(
    "Shlok-Movement-Pre-recorded"
  );

  useEffect(() => {
    if (slug) {
      setShlok(getShlokas(slug));
      setShlokMovement(getShlokasMovements(slug));
      setShlokNo(1);
      // get the data from localstorage with the name slug.
      const data = localStorage.getItem(slug);
      if (data) {
        const parsedData = JSON.parse(data);
        setShlokCustomMovement(parsedData.customMovements);
      }

      const localStorageData = localStorage.getItem("mostRecent");
      const shlokData = getSingleShlokData(slug[0]);
      const addingData = [
        {
          name: shlokData.title,
          link: "/shlok/" + slug,
          detail: shlokData.subTitle,
          img: shlokData.image,
        },
      ];
      if (localStorageData) {
        const parsedData = JSON.parse(localStorageData);
        if (parsedData.some((item) => item.name === shlokData.title)) return;
        const updatedData = [...addingData, parsedData[0]];
        localStorage.setItem("mostRecent", JSON.stringify(updatedData));
      } else {
        localStorage.setItem(
          "mostRecent",
          JSON.stringify([...addingData, ...addingData])
        );
      }
    }
  }, [slug]);

  useEffect(() => {
    if (shlokNo > 0) {
      const sliderTrack = document.getElementById("sliderTrack");
      sliderTrack.style.transform = `translateX(-${(shlokNo - 1) * 100}vw)`;
    }
  }, [shlokNo]);

  async function startMovement(title, record) {
    if (shlokMovement.length > 0) {
      setShlokNo(0);
      setShlokSettings(4);
      setSelectedTitle(title);
      isMovementStoppedRef.current = false;
      if (record) {
        for (const [index, time] of record.entries()) {
          if (isMovementStoppedRef.current) break;

          await new Promise((resolve) => setTimeout(resolve, time * 1000));
          if (!isMovementStoppedRef.current) {
            setShlokNo(index + 1);
          }
        }
      }
    }
    setShlokSettings(0);
  }

  function stopMovement() {
    isMovementStoppedRef.current = true; // Set the ref to stop
    setShlokNo(1);
    setShlokSettings(0);
  }

  function deleteCustomMovement(title) {
    const updatedMovements = shlokCustomMovement.filter(
      (movement) => movement.title !== title
    );
    setShlokCustomMovement(updatedMovements);
    localStorage.setItem(
      slug,
      JSON.stringify({ customMovements: updatedMovements })
    );
  }

  function addCustomMovement(e) {
    e.preventDefault();
    const title = inputRef.current.value;
    if (title.trim() === "") {
      window.alert("Please enter a title");
      return;
    }
    inputRef.current.value = "";
    setShlokNo(0);
    setCustomMovements({
      title,
      record: [],
    });
  }

  function updateCustomMovement(next) {
    if (next) {
      if (shlokNo < Object.keys(shlok).length) {
        setShlokNo((prev) => prev + 1);
        const next = Date.now();
        setTimeFrames((prev) => [...prev, next]);
      } else if (
        shlokNo === Object.keys(shlok).length &&
        !isMovementEndedRef.current
      ) {
        const next = Date.now();
        setTimeFrames((prev) => [...prev, next]);
        isMovementEndedRef.current = true;
      } else {
        const customMovements1 = {
          title: customMovements.title,
          record: [],
        };
        for (let i = 0; i < timeFrames.length - 1; i++) {
          customMovements1.record[i] = parseFloat(
            (timeFrames[i + 1] - timeFrames[i]) / 1000
          ).toFixed(2);
        }
        setShlokCustomMovement((prev) => [...prev, customMovements1]);
        const existingMovements = localStorage.getItem(slug);
        if (existingMovements) {
          const parsedData = JSON.parse(existingMovements);
          parsedData.customMovements.push(customMovements1);
          localStorage.setItem(slug, JSON.stringify(parsedData));
        } else {
          localStorage.setItem(
            slug,
            JSON.stringify({ customMovements: [customMovements1] })
          );
        }
        setCustomMovements(null);
        setShlokSettings(0);
        setShlokNo(1);
      }
      return;
    }
    if (customMovements) {
      setShlokNo(0);
      isMovementEndedRef.current = false;
      const start = Date.now();
      setTimeFrames((prev) => [...prev, start]);
    }
  }

  return (
    <div className={classes.container}>
      <div className={classes.shlokImagesContainer}>
        <div
          className={classes.sliderTrack}
          id="sliderTrack"
          // style={{ transform: `translateX(-${shlokNo * 100}vw)` }}
        >
          {shlokNo > 0 && shlok ? (
            Object.keys(shlok).map((s, idx) => (
              <div className={classes.shlokImageMain} key={idx}>
                <Image
                  src={
                    shlok[`shlok${idx + 1}`]?.split("\n\n")[2] !== ""
                      ? shlok[`shlok${idx + 1}`].split("\n\n")[2]
                      : "/testingHero.jpg"
                  }
                  alt={slug}
                  fill={true}
                  priority={true}
                  sizes="100vw"
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
              </div>
            ))
          ) : (
            <Image
              src="/testingHero.jpg"
              alt={slug}
              fill={true}
              priority={true}
              sizes="100vw"
              style={{
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
          )}
        </div>
      </div>
      <div className={classes.shlokMain}>
        <div className={classes.smallTitle}>
          {shlokNo > 0 && shlok
            ? shlok[`shlok${shlokNo}`].split("\n\n")[0]
            : "Shlok"}
        </div>
        <div className={classes.smallDetail}>
          {shlokNo > 0 ? shlok[`shlok${shlokNo}`].split("\n\n")[1] : slug}
        </div>
      </div>
      <div className={classes.shlokSlider}>
        <div
          className={`${classes.shlokSliderMain} hover`}
          onClick={() => {
            if (customMovements) {
              return;
            }
            if (shlokNo > 1) setShlokNo((prev) => prev - 1);
          }}
        >
          <IoIosArrowBack />
        </div>
        <div className={`${classes.shlokSliderMain} hover`}>
          <IoPause />
        </div>
        <div
          className={`${classes.shlokSliderMain} hover`}
          onClick={() => {
            if (customMovements) {
              updateCustomMovement(true);
              return;
            }
            if (shlokNo < Object.keys(shlok).length)
              setShlokNo((prev) => prev + 1);
          }}
        >
          <IoIosArrowForward />
        </div>
      </div>
      <div
        className={`${classes.shlokSettings} ${classes.shlokMain} ${
          shlokSettings === 0 ? classes.recordMain + " hover" : ""
        }`}
        style={shlokSettings === 4 ? { padding: "0.5rem 0.8rem" } : {}}
        onClick={() => {
          if (shlokSettings === 0) setShlokSettings(1);
        }}
      >
        {shlokSettings === 0 && (
          <div
            className={classes.shlokRecord}
            title="Record the movement according to any song"
          >
            <BsRecord2 />
          </div>
        )}
        {shlokSettings === 1 && (
          <>
            <div className={classes.smallTitle} style={{ textAlign: "center" }}>
              Record Rhythm
            </div>
            <div className={classes.shlokSettingsMain}>
              <div className={classes.shlokSettingsOption}>
                <div className={classes.shlokSettingsLabel}>Pre-Recorded</div>
                <div
                  className={classes.smallDetail}
                  onClick={() => {
                    setShlokSettings(2);
                  }}
                >
                  Open
                </div>
              </div>
              <div className={classes.shlokSettingsOption}>
                <div className={classes.shlokSettingsLabel}>Custom</div>
                <div
                  className={classes.smallDetail}
                  onClick={() => {
                    setShlokSettings(3);
                  }}
                >
                  Open
                </div>
              </div>
              <div
                className={classes.shlokSettingsClose}
                onClick={() => {
                  setShlokSettings(0);
                }}
              >
                Close
              </div>
            </div>
          </>
        )}
        {shlokSettings === 2 && (
          <>
            <div className={classes.smallTitle} style={{ textAlign: "center" }}>
              Pre-Recorded
            </div>
            <div className={classes.shlokSettingsMain}>
              {shlokMovement.map((movement, index) => (
                <>
                  <div
                    className={classes.shlokPlaying}
                    style={{ gap: "2rem" }}
                    key={index}
                  >
                    <div className={classes.shlokPlayingLabel}>
                      <div className={classes.shlokPlayingLabelInside}>
                        {movement.title}
                      </div>
                    </div>
                    <div
                      className={classes.shlokPlayingClose}
                      onClick={async () => {
                        await startMovement(movement.title, movement.record);
                      }}
                    >
                      <FaRegPlayCircle />
                    </div>
                  </div>
                </>
              ))}
              {shlokMovement.length === 0 && (
                <div
                  className={classes.smallDetail}
                  style={{
                    paddingBottom: "1rem",
                    fontSize: "1rem",
                    opacity: 0.8,
                  }}
                >
                  No Pre-recorded movements added
                </div>
              )}
              <div
                className={classes.shlokSettingsClose}
                onClick={() => {
                  setShlokSettings(1);
                }}
              >
                Back
              </div>
            </div>
          </>
        )}
        {shlokSettings === 3 && (
          <>
            <div className={classes.smallTitle} style={{ textAlign: "center" }}>
              Custom
            </div>
            <div className={classes.shlokSettingsMain}>
              {shlokCustomMovement.map((movement, index) => (
                <>
                  <div
                    className={classes.shlokPlaying}
                    style={{ gap: "2rem" }}
                    key={index}
                  >
                    <div className={classes.shlokPlayingLabel}>
                      <div className={classes.shlokPlayingLabelInside}>
                        {movement.title}
                      </div>
                    </div>
                    <div
                      className={classes.shlokPlayingClose}
                      onClick={async () => {
                        await startMovement(movement.title, movement.record);
                      }}
                    >
                      <FaRegPlayCircle />
                    </div>
                    <div
                      className={classes.shlokPlayingClose}
                      style={{ marginLeft: "-1.5rem" }}
                      onClick={() => {
                        deleteCustomMovement(movement.title);
                      }}
                    >
                      <MdDelete />
                    </div>
                  </div>
                </>
              ))}
              {shlokCustomMovement.length === 0 && (
                <div
                  className={classes.smallDetail}
                  style={{
                    paddingBottom: "1rem",
                    fontSize: "1rem",
                    opacity: 0.8,
                  }}
                >
                  No custom movements added
                </div>
              )}
              <div
                className={classes.shlokSettingsClose}
                style={{ marginBottom: "-0.5rem" }}
                onClick={() => {
                  setShlokSettings(5);
                }}
              >
                Add
              </div>
              <div
                className={classes.shlokSettingsClose}
                onClick={() => {
                  setShlokSettings(1);
                }}
              >
                Back
              </div>
            </div>
          </>
        )}
        {shlokSettings === 4 && (
          <div
            className={`${classes.shlokPlaying} ${classes.smallShlokPlaying}`}
          >
            <div className={classes.shlokPlayingLabel}>
              <div className={classes.shlokPlayingLabelInside}>
                {selectedTitle}
              </div>
            </div>
            <div
              className={classes.shlokPlayingClose}
              onClick={() => {
                stopMovement();
              }}
            >
              <FaRegStopCircle />
            </div>
          </div>
        )}
        {shlokSettings === 5 && (
          <>
            <div className={classes.smallTitle} style={{ textAlign: "center" }}>
              Add Custom
            </div>
            {!customMovements ? (
              <div className={classes.shlokSettingsMain}>
                <form
                  className={classes.smallDetail}
                  onSubmit={addCustomMovement}
                  style={{ opacity: 1 }}
                >
                  <input
                    className={classes.shlokInput}
                    type="text"
                    ref={inputRef}
                    minLength={4}
                    maxLength={20}
                    placeholder="Record Title"
                  />
                  <button
                    className={classes.shlokSettingsClose}
                    style={{
                      marginBottom: "-0.5rem",
                      outline: "none",
                      border: "none",
                      width: "100%",
                    }}
                    type="submit"
                  >
                    Create
                  </button>
                </form>
                <div
                  className={classes.shlokSettingsClose}
                  onClick={() => {
                    setShlokSettings(3);
                  }}
                >
                  Back
                </div>
              </div>
            ) : (
              <>
                <div
                  className={classes.ListeningDetails}
                  style={{
                    paddingBottom: "1rem",
                    fontSize: "1rem",
                    opacity: 0.8,
                  }}
                >
                  <div className={classes.loading}>
                    <div className={classes.load}></div>
                    <div className={classes.load}></div>
                    <div className={classes.load}></div>
                    <div className={classes.load}></div>
                  </div>
                  Recording...
                </div>
                <div className={classes.shlokSettingsMain}>
                  <div
                    className={classes.shlokSettingsClose}
                    onClick={() => {
                      setCustomMovements(null);
                    }}
                  >
                    Cancel
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
