import React from "react";

interface AnyChildren {
  children: React.ReactNode;
}

interface TitleProps extends AnyChildren {
  toggle: React.Dispatch<React.SetStateAction<boolean>>;
}

interface GroupProps extends AnyChildren {
  show: boolean;
}

interface FiltersComponent extends React.FC<AnyChildren> {
  Title: React.FC<TitleProps>;
  Group: React.FC<GroupProps>;
  Category: React.FC<any>;
}

const Filters: FiltersComponent = ({ children }) => {
  return (
    <aside
      className="gap-x-1 lg:col-span-1 lg:col-start-1 lg:row-span-5 sticky top-4 grid grid-cols-4 xs:gap-x-3 gap-y-2 
      grid-flow-dense 
        lg:relative lg:top-auto z-10 lg:block
        "
    >
      {children}
    </aside>
  );
};

const Title: React.FC<TitleProps> = ({ children, toggle }) => {
  return (
    <p
      onClick={() => toggle((prev) => !prev)}
      className="bg-gray_25
      text-xs sm:text-sm lg:text-base border border-gray_400 inline-block text-center  py-2 rounded-lg
      lg:border-l-transparent lg:border-r-transparent lg:border-t-transparent lg:block lg:p-0 lg:rounded-none lg:mr-0
      lg:font-medium lg:text-gray_500 lg:border-gray_500 lg:border-b lg:border-opacity-35 lg:hover:text-gray_900 hover:cursor-pointer lg:hover:border-opacity-100 lg:text-left lg:mb-2 overflow-hidden lg:bg-transparent"
    >
      {children}
    </p>
  );
};

const Group: React.FC<GroupProps> = ({ children, show }) => {
  if (!show) return <></>;
  return (
    <ul
      className="flex gap-3 border border-gray_900 bg-gray_100 rounded-lg p-4 col-span-4
          flex-row flex-wrap
          lg:flex-col lg:relative lg:border-none lg:rounded-none lg:p-0 lg:gap-4 lg:flex-nowrap lg:bg-transparent lg:mb-6
          "
    >
      {children}
    </ul>
  );
};

const Category: React.FC<any> = ({ value }) => {
  return (
    <li
      className="text-wrap line-clamp-1 text-sm cursor-pointer bg-gray_25
        px-2.5 py-1 border rounded-lg border-gray_900
        lg:p-0 lg:border-none lg:rounded-none lg:bg-transparent
      "
      title={value}
    >
      {value}
    </li>
  );
};

Filters.Title = Title;
Filters.Group = Group;
Filters.Category = Category;

export default Filters;
