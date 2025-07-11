import React from "react";
import { ScaleLoader } from "react-spinners";

interface SpinnerProps{
    loading:boolean
}

const Spinner: React.FC<SpinnerProps> = ({loading}) => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="bg-clear ">
            {loading ? 
            <ScaleLoader></ScaleLoader>    
            :null
        }
      </div>
    </div>
  );
};

export default Spinner;