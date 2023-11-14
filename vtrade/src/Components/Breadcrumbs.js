import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // if we're at homepage, don't show breadcrumbs
  if (pathnames.length === 0) {
    return <div />;
  }

  return (
    <div className='ml-14 bg-white py-4 md:py-5'>
      <ul className='flex items-center'>
        <li className='flex items-center'>
          <Link
            to='/'
            className="text-gray-600 font-mulish text-base font-semibold text-s leading-5"
          >
            Home
          </Link>
          {/* Render additional breadcrumb items based on the route hierarchy */}
          {pathnames.map((name, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
            const isLast = index === pathnames.length - 1;

            return (
              <React.Fragment key={name}>
                <span className='text-body-color px-3'>/</span>
                {isLast ? (
                  <span
                    className="text-sky-400 font-mulish text-base font-semibold text-s leading-5"
                  >
                    {name}
                  </span>
                ) : (
                  <Link
                    to={routeTo}
                    className="text-gray-600 font-mulish text-base font-semibold text-s leading-5"
                  >
                    {name}
                  </Link>
                )}
              </React.Fragment>
            );
          })}
        </li>
      </ul>
    </div>
  );
};

export default Breadcrumbs;
