import React from "react";

enum PopupType{
    Error="ERROR",
    Warning="ALERT"
}

interface PopupContent {
  type:PopupType
  titleMsg: string;
  descMsg: string
  setShow: (value: boolean) => void;
  confirm: () => void;
}

const Popup: React.FC<PopupContent> = (popup) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h3 className={`text-lg font-semibold mb-4 text-center ${popup.type === PopupType.Error ? " text-red-500" : " text-blue-500"}`}>{popup.type}</h3>
        <h3 className="text-lg font-semibold mb-4">{popup.titleMsg}</h3>
        <p className="text-gray-800 mb-4">
        {popup.descMsg}
        </p>

        <div className="flex gap-3">
          <button
            onClick={() => popup.setShow(false)}
            className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={popup.confirm}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
