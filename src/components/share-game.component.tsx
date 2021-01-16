import React, { useRef, useState } from "react";

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
    <div className="mt-5 alert alert-secondary">
      <h4 className="alert-heading">Lade deine Freunde ein</h4>
      <p>
        Spiele gegen deine Freunde, indem du Ihnen den folgenden Link
        zuschickst.
      </p>
      <hr />
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
        {document.queryCommandSupported("copy") && (
          <button
            className="btn btn-success"
            type="button"
            id="button-addon2"
            onClick={copyToClipboard}
          >
            {copyDone ? "🎉 Link wurde Kopiert!" : "Link Kopieren"}
          </button>
        )}
      </div>
    </div>
  );
};

export default ShareComponent;
