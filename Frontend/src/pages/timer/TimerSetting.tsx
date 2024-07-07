import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const TimerSetting: React.FC = () => {
  const navigate = useNavigate();

  const [selectedImage, setSelectedImage] = useState<
    string | ArrayBuffer | null
  >(null);
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
  const [currentWallpaper, setCurrentWallpaper] = useState<
    string | ArrayBuffer | null
  >(null);

  // 이전 버튼 클릭 시 메인 페이지로 이동
  const handleNavigate = (): void => {
    navigate('/pomodoro');
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePreview = (wallpaper: string) => {
    setSelectedImage(null);
    setPreview(wallpaper);
  };

  const setWallpaper = () => {
    if (selectedImage) {
      localStorage.setItem('wallpaper', selectedImage.toString());
      setCurrentWallpaper(selectedImage);
    } else if (preview) {
      localStorage.setItem('wallpaper', preview.toString());
      setCurrentWallpaper(preview);
    }
    navigate('/pomodoro');
  };

  const getPreviewStyle = () => {
    switch (preview) {
      case 'none':
        return 'bg-gray-100';
      case 'white':
        return 'bg-white';
      case 'dark':
        return 'bg-gray-800';
      default:
        return `url(${preview}) no-repeat center center fixed bg-cover`;
    }
  };

  return (
    <div>
      {/* 헤더 */}
      <div className="max-w-2xl px-4 py-16 mx-auto sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
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

        {/* 배경 선택 */}
        <div className="grid grid-cols-1 mt-6 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {/* 배경 : 없음 */}
          <div className="relative group">
            <div className="w-full overflow-hidden bg-gray-100 rounded-md cursor-pointer aspect-h-1 aspect-w-1 lg:aspect-none group-hover:opacity-75 lg:h-80">
              <div
                className="object-cover object-center w-full h-full lg:h-full lg:w-full"
                onClick={() => handlePreview('none')}
              >
                <div className="p-4 text-2xl font-bold text-center">None</div>
              </div>
            </div>
          </div>
          {/* 배경 : White */}
          <div className="relative group">
            <div className="w-full overflow-hidden bg-white rounded-md cursor-pointer aspect-h-1 aspect-w-1 lg:aspect-none group-hover:opacity-75 lg:h-80 outline">
              <div
                className="object-cover object-center w-full h-full lg:h-full lg:w-full"
                onClick={() => handlePreview('white')}
              >
                <div className="p-4 text-2xl font-bold text-center">White</div>
              </div>
            </div>
          </div>
          {/* 배경: Dark */}
          <div className="relative group">
            <div className="w-full overflow-hidden bg-gray-800 rounded-md cursor-pointer aspect-h-1 aspect-w-1 lg:aspect-none group-hover:opacity-75 lg:h-80">
              <div
                className="object-cover object-center w-full h-full lg:h-full lg:w-full"
                onClick={() => handlePreview('dark')}
              >
                <div className="p-4 text-2xl font-bold text-center text-white">
                  Dark
                </div>
              </div>
            </div>
          </div>
          {/* 배경: 사용자 커스텀 */}
          <div className="relative group">
            <div className="w-full overflow-hidden bg-gray-300 rounded-md cursor-pointer aspect-h-1 aspect-w-1 lg:aspect-none group-hover:opacity-75 lg:h-80">
              <div className="object-cover object-center w-full h-full lg:h-full lg:w-full">
                <div className="p-4 text-2xl font-bold text-center">
                  <label>
                    <AddCircleOutlineIcon />
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {preview && (
        <div
          className={`mt-4 w-full h-64 ${
            preview === 'none'
              ? 'bg-gray-100'
              : preview === 'white'
              ? 'bg-white'
              : preview === 'dark'
              ? 'bg-gray-800'
              : ''
          }`}
          style={
            preview !== 'none' && preview !== 'white' && preview !== 'dark'
              ? {
                  backgroundImage: `url(${preview})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }
              : {}
          }
        >
          <p className="pt-20 text-center text-white">Preview</p>
        </div>
      )}

      {preview && (
        <div className="mt-4">
          <button
            className="px-4 py-2 text-white bg-blue-500 rounded"
            onClick={setWallpaper}
          >
            Apply
          </button>
        </div>
      )}
    </div>
  );
};

export default TimerSetting;
