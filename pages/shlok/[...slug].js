import { useRouter } from "next/router";
import classes from "@/styles/shlok.module.css";
import Image from "next/image";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IoPause } from "react-icons/io5";
import { useEffect, useState } from "react";
import { getShlokas } from "@/Books_PDFs/Shlok/others-shloks.js";
import { BsRecord2 } from "react-icons/bs";
import { FaRegPlayCircle, FaRegStopCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function Shlok() {
  const router = useRouter();
  const slug = router.query.slug;
  const [shlok, setShlok] = useState(null);
  const [shlokNo, setShlokNo] = useState(0);
  const [shlokSettings, setShlokSettings] = useState(4);

  useEffect(() => {
    if (slug) {
      setShlok(getShlokas(slug));
      setShlokNo(1);
    }
  }, [slug]);
  return (
    <div className={classes.container}>
      <Image
        src="/testingHero.jpg"
        alt="Picture of the author"
        fill={true}
        priority={true}
        style={{
          objectFit: "cover",
          objectPosition: "center",
        }}
      />
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
              <div className={classes.shlokPlaying} style={{ gap: "2rem" }}>
                <div className={classes.shlokPlayingLabel}>
                  <div className={classes.shlokPlayingLabelInside}>
                    Spotify-Shiv-Strotam-Female-Voice
                  </div>
                </div>
                <div
                  className={classes.shlokPlayingClose}
                  onClick={() => {
                    setShlokSettings(4);
                  }}
                >
                  <FaRegPlayCircle />
                </div>
              </div>
              <div className={classes.shlokPlaying} style={{ gap: "2rem" }}>
                <div className={classes.shlokPlayingLabel}>
                  <div className={classes.shlokPlayingLabelInside}>
                    Spotify-Shiv-Strotam-Female-Voice
                  </div>
                </div>
                <div
                  className={classes.shlokPlayingClose}
                  onClick={() => {
                    setShlokSettings(4);
                  }}
                >
                  <FaRegPlayCircle />
                </div>
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
        {shlokSettings === 3 && (
          <>
            <div className={classes.smallTitle} style={{ textAlign: "center" }}>
              Custom
            </div>
            <div className={classes.shlokSettingsMain}>
              <div className={classes.shlokPlaying} style={{ gap: "2rem" }}>
                <div className={classes.shlokPlayingLabel}>
                  <div className={classes.shlokPlayingLabelInside}>
                    Spotify-Shiv-Strotam-Female-Voice
                  </div>
                </div>
                <div
                  className={classes.shlokPlayingClose}
                  onClick={() => {
                    setShlokSettings(4);
                  }}
                >
                  <FaRegPlayCircle />
                </div>
                <div
                  className={classes.shlokPlayingClose}
                  style={{ marginLeft: "-1.5rem" }}
                >
                  <MdDelete />
                </div>
              </div>
              <div className={classes.shlokPlaying} style={{ gap: "2rem" }}>
                <div className={classes.shlokPlayingLabel}>
                  <div className={classes.shlokPlayingLabelInside}>
                    Spotify-Shiv-Strotam-Female-Voice
                  </div>
                </div>
                <div
                  className={classes.shlokPlayingClose}
                  onClick={() => {
                    setShlokSettings(4);
                  }}
                >
                  <FaRegPlayCircle />
                </div>
                <div
                  className={classes.shlokPlayingClose}
                  style={{ marginLeft: "-1.5rem" }}
                >
                  <MdDelete />
                </div>
              </div>
              <div
                className={classes.shlokSettingsClose}
                style={{ marginBottom: "-0.5rem" }}
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
          <div className={classes.shlokPlaying}>
            <div className={classes.shlokPlayingLabel}>
              <div className={classes.shlokPlayingLabelInside}>
                Spotify-Shiv-Strotam-Female-Voice
              </div>
            </div>
            <div
              className={classes.shlokPlayingClose}
              onClick={() => {
                setShlokSettings(1);
              }}
            >
              <FaRegStopCircle />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
