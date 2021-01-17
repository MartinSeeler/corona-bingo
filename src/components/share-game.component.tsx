import React, { useRef, useState } from "react";
import { WhatsappShareButton } from "react-share";
import {
  FacebookIcon,
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
} from "react-share/es";

const ShareComponent: React.FunctionComponent = () => {
  const urlField = useRef<HTMLInputElement>(null);
  const [copyDone, setCopyDone] = useState(false);
  const copyToClipboard = () => {
    if (urlField.current) {
      urlField.current.select();
      document.execCommand("copy");
      setCopyDone(true);
    }
  };
  return (
    <>
      <div className="accordion mt-4" id="infoAccordion">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingShare">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseShare"
              aria-expanded="false"
              aria-controls="collapseShare"
            >
              Freunde einladen
            </button>
          </h2>
          <div
            id="collapseShare"
            className="accordion-collapse collapse"
            aria-labelledby="headingShare"
            data-bs-parent="#infoAccordion"
          >
            <div className="accordion-body">
              <p>
                Spiele gegen deine Freunde, indem du Ihnen den Link zum Spiel
                zuschickst.
              </p>
              <div className="p">
                <WhatsappShareButton
                  url={window.location.href}
                  title={"Lust auf eine Runde Corona Bingo?"}
                  separator={"\n"}
                  className={"px-2"}
                >
                  <WhatsappIcon size={48} round />
                </WhatsappShareButton>
                <TelegramShareButton
                  url={window.location.href}
                  title={"Lust auf eine Runde Corona Bingo?"}
                  className={"px-2"}
                >
                  <TelegramIcon size={48} round />
                </TelegramShareButton>
                <TwitterShareButton
                  url={window.location.href}
                  title={"Lust auf eine Runde Corona Bingo?"}
                  hashtags={["coronabingo", "corona"]}
                  related={["martinseeler"]}
                  className={"px-2"}
                >
                  <TwitterIcon size={48} round />
                </TwitterShareButton>
                <FacebookShareButton
                  url={window.location.href}
                  title={"Lust auf eine Runde Corona Bingo?"}
                  hashtag={"coronabingo"}
                  className={"px-2"}
                >
                  <FacebookIcon size={48} round />
                </FacebookShareButton>
              </div>
              <br />
              <div className="input-group input-group-lg mb-0">
                <input
                  ref={urlField}
                  type="text"
                  className="form-control"
                  value={window.location.href}
                  readOnly={true}
                  aria-label="Recipient's username"
                  aria-describedby="button-addon2"
                />
              </div>
              {document.queryCommandSupported("copy") && (
                <div className="d-grid gap-2">
                  <button
                    className="btn btn-success"
                    type="button"
                    id="btn-copyToClipboard"
                    onClick={copyToClipboard}
                  >
                    {copyDone ? "🎉 Link wurde Kopiert!" : "Link Kopieren"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShareComponent;
