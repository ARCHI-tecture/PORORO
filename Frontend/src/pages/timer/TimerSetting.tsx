import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const TimerSetting: React.FC = () => {
  const navigate = useNavigate();

  const [bgOption, setBgOption] = useState(
    localStorage.getItem('bgOption') || 'none',
  );
  const [bgValue, setBgValue] = useState(
    localStorage.getItem('bgValue') || '#ffffff',
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    localStorage.getItem('bgValue') || null,
  );
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // 이전 버튼 클릭 시 메인 페이지로 이동
  const handleNavigate = (): void => {
    navigate('/pomodoro');
  };

  const handleSave = () => {
    localStorage.setItem('bgOption', bgOption);
    if (bgOption === 'image' && imageFile) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        localStorage.setItem('bgValue', result);
        alert('설정 완료!');
      };
      reader.readAsDataURL(imageFile);
    } else {
      localStorage.setItem('bgValue', bgValue);
      alert('설정 완료!');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setImageFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const renderPreview = () => {
    if (bgOption === 'white') {
      return <div className="w-full bg-gray-200 rounded-md h-52" />;
    } else if (bgOption === 'dark') {
      return <div className="w-full bg-gray-800 rounded-md h-52" />;
    } else if (bgOption === 'image' && imagePreview) {
      return (
        <img
          src={imagePreview}
          alt="Preview"
          className="object-cover w-full rounded-md h-52"
        />
      );
    }
    return null;
  };

  return (
    <div>
      {/* 헤더 */}
      <div className="max-w-2xl px-4 py-16 mx-auto sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="flex items-center space-x-4">
          <IconButton
            aria-label="back"
            color="inherit"
            onClick={() => {
              handleNavigate();
            }}
          >
            <ArrowBackIosIcon />
          </IconButton>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            배경화면 설정
          </h2>
        </div>

        {/* 배경 선택 */}
        <div className="grid grid-cols-1 mt-6 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {/* 배경 : 없음 */}
          <div className="relative group">
            <div className="w-full overflow-hidden bg-gray-100 rounded-md cursor-pointer aspect-h-1 aspect-w-1 lg:aspect-none group-hover:opacity-75 lg:h-80">
              <div className="object-cover object-center w-full h-full lg:h-full lg:w-full">
                <div className="p-4 text-2xl font-bold text-center">
                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      style={{ display: 'none' }}
                      value="none"
                      checked={bgOption === 'none'}
                      onChange={() => {
                        setBgOption('none');
                        setBgValue('#ffffff');
                      }}
                    />
                    None
                  </label>
                </div>
              </div>
            </div>
          </div>
          {/* 배경 : White */}
          <div className="relative group">
            <div className="w-full overflow-hidden bg-white rounded-md cursor-pointer aspect-h-1 aspect-w-1 lg:aspect-none group-hover:opacity-75 lg:h-80 outline">
              <div className="object-cover object-center w-full h-full lg:h-full lg:w-full">
                <div className="p-4 text-2xl font-bold text-center">
                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      style={{ display: 'none' }}
                      value="white"
                      checked={bgOption === 'white'}
                      onChange={() => {
                        setBgOption('white');
                        setBgValue('#f3f4f6');
                      }}
                    />
                    White
                  </label>
                </div>
              </div>
            </div>
          </div>
          {/* 배경: Dark */}
          <div className="relative group">
            <div className="w-full overflow-hidden bg-gray-800 rounded-md cursor-pointer aspect-h-1 aspect-w-1 lg:aspect-none group-hover:opacity-75 lg:h-80">
              <div className="object-cover object-center w-full h-full lg:h-full lg:w-full">
                <div className="p-4 text-2xl font-bold text-center text-white">
                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      style={{ display: 'none' }}
                      value="dark"
                      checked={bgOption === 'dark'}
                      onChange={() => {
                        setBgOption('dark');
                        setBgValue('#1f2937');
                      }}
                    />
                    Dark
                  </label>
                </div>
              </div>
            </div>
          </div>
          {/* 배경: 사용자 커스텀 */}
          <div className="relative group">
            <div className="w-full overflow-hidden bg-gray-300 rounded-md cursor-pointer aspect-h-1 aspect-w-1 lg:aspect-none group-hover:opacity-75 lg:h-80">
              <div className="object-cover object-center w-full h-full lg:h-full lg:w-full">
                <div className="p-4 text-2xl font-bold text-center">
                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      style={{ display: 'none' }}
                      value="image"
                      checked={bgOption === 'image'}
                      onChange={() => setBgOption('image')}
                    />
                    <AddCircleOutlineIcon
                      onClick={() => fileInputRef.current?.click()}
                    />
                  </label>
                  {bgOption === 'image' && (
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* {preview && (
        <div className="w-full h-64 mt-4" style={getPreviewStyle()}>
          <p className="pt-20 text-center text-white">Preview</p>
        </div>
      )}

      {preview && (
        <div className="flex justify-center mt-4">
          <button
            className="px-4 py-2 text-white bg-blue-500 rounded"
            onClick={setWallpaper}
          >
            Apply
          </button>
        </div>
      )} */}

      {renderPreview()}

      <div className="flex justify-center mt-4">
        <button
          className="px-4 py-2 text-white bg-blue-500 rounded"
          onClick={handleSave}
        >
          적용
        </button>
      </div>
    </div>
  );
};

export default TimerSetting;
