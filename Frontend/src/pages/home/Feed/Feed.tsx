import React from 'react';
import { useRecoilValue } from 'recoil';
import { categoryState } from '../../path-to-categoryState'; // categoryState 경로 확인 필요

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <div>{children}</div>
);
const List = ({ children }: { children: React.ReactNode }) => (
  <ul>{children}</ul>
);

interface ICategory {
  label: string;
}

const FeedItemList: React.FC<{ category: ICategory }> = ({ category }) => {
  // TodoCheck와 todoSelector가 정의되어 있다고 가정
  const items = useRecoilValue(todoSelector(category.label));

  return (
    <>
      {/* CategoryButton, TodoItem, InputForm 등의 컴포넌트 사용 */}
      <div>{category.label}</div>
      {items.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </>
  );
};

const Feed = () => {
  const categories = useRecoilValue(categoryState);

  return (
    <Wrapper>
      <div>Feed</div>
      <List>
        {categories.map((category: ICategory) => (
          <FeedItemList category={category} key={category.label} />
        ))}
      </List>
    </Wrapper>
  );
};

export default Feed;
