import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CategoryType } from '../RoutineType';
import { RoutineCreateList } from '../RoutineList/RoutineCreateList';
import AddIcon from '@mui/icons-material/Add';
import {IconButton} from '@mui/material';

export const RoutineCategoryList: React.FC = () => {
  const navigate = useNavigate();

  const handleRoutineCreateNavigate = (categoryIndex: number): void => {
    localStorage.setItem('categoryIndex', categoryIndex.toString());
    navigate('/routinecreate');
  };

  const initialCategory: CategoryType = {
    editIdx: 0,
    category: '카테고리가 없습니다',
    color: 'black'
  }

  const [localCategory, setLocalCategory] = useState<CategoryType[]>([
    initialCategory
  ]);

  useEffect(() => {
    try {
      const Categorys = localStorage.getItem('categoryArr');
      if (Categorys) {
        const parsedCategories: CategoryType[] = JSON.parse(Categorys);
        setLocalCategory(parsedCategories)
      }
    } catch (error) {
      console.log('카테고리가 없습니다');
    }
  }, []);

  return (
    <div >
      {localCategory.map((category, categoryIndex) => (
        <div
          key={categoryIndex}
          className='p-5 sm:ml-20'>
          <p
            style={{ color: category.color}}
            className='
              m-2 pl-2 border border-gray-300 inline-block rounded-full
            bg-gray-300 w-35 text-left font-extrabold'
          >{category.category}
            {categoryIndex >= 0 ?
              <IconButton
                aria-label="add"
                onClick={() => handleRoutineCreateNavigate(categoryIndex)}
              >
                <AddIcon style={{color:'black',fontSize:'20px', backgroundColor:'white',borderRadius:"50%"}} />
              </IconButton>
              :
              ''
            }
          </p>
          <RoutineCreateList categoryIndex={categoryIndex} categoryColor={category.color}/>
        </div>
      ))}
    </div>
  );
}
