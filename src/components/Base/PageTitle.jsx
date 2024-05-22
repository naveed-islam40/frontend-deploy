import React from 'react';

export default function PageTitle({ title, subtitle, loading }) {
  return (
    <div className="mb-6 mt-3 ml-2">
      <div className="mt-0 md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          {loading ? (
            <>
              {/* Skeleton for Title */}
              <h3 className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 mb-2" style={{ width: "40%" }}></h3>
              {/* Skeleton for Subtitle, if needed */}
              {subtitle && <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 mt-1" style={{ width: "30%" }}></div>}
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold tracking-tight leading-7 text-slate-900 ">
                {title}
              </h2>
              {subtitle && (
                <p className="mt-1.5 text-md text-slate-900">
                  {subtitle}
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
