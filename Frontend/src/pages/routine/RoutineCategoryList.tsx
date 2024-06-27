import React, { useEffect,  useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CategoryType } from './RoutineType';


export const RoutineCategoryList = () => {
  const navigate = useNavigate();

  const handleRoutineCreateNavigate = (): void => {
    navigate('/routinecreate');
  };

  const initialCategory: CategoryType ={
    editIdx: 0,
    category: '카테고리가 없습니다',
    color: 'black'
  }

  const [localCategory, setlocalCategory] = useState<CategoryType[]>([
    initialCategory
  ]);

  useEffect(() => {
    try {
      const Categorys = localStorage.getItem('categoryArr');
      if(Categorys){
        const parsedCategories: CategoryType[] = JSON.parse(Categorys);
        setlocalCategory(parsedCategories)
      }
    } catch(error) {
      console.log('카테고리가 없습니다');
    }
  }, []);

  return (
    <div>
      {localCategory.map((category, index) => (
          <div key={index}>
            <p style={{ color: category.color }}>{category.category}
              {index?
                <button onClick={handleRoutineCreateNavigate}>+</button>
                :
                ''
              }
            </p>
          </div>
        ))}
    </div>
  )
}
