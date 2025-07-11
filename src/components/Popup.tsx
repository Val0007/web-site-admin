import React from "react";
import type { PopupContent } from "../types";

const Popup: React.FC<PopupContent> = (popup) => {
  return (
    <div className="">
      <div className="bg-white rounded-lg p-6 w-96">
              <h3 className={`text-lg font-semibold mb-4 text-center ${popup.type === "ERROR"
                      ? "text-red-500"
                      : popup.type === "ALERT"
                          ? "text-blue-500"
                          : popup.type === "SUCCESS"
                              ? "text-green-600"
                              : ""
                  }`}>
                  {popup.type}
              </h3>
        <h3 className="text-lg font-semibold mb-4">{popup.titleMsg}</h3>
        <p className="text-gray-800 mb-4">
        {popup.descMsg}
        </p>

        <div className="flex gap-3">
          <button
            onClick={() => popup.setShow(false)}
            className="flex-1 bg-gray-600 py-2 px-4 rounded hover:bg-gray-400 transition-colors text-white"
          >
            Cancel
          </button>
          {popup.confirm ? 
          <button
            onClick={popup.confirm}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
          >
            Done
          </button>
          : null }
        </div>
      </div>
    </div>
  );
};

export default Popup;
