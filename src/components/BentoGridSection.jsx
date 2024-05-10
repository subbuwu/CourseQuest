import React from "react";
import { BentoGrid, BentoGridItem } from "./BentoGrid.jsx";

export function BentoGridSection() {
  return (
    <BentoGrid className="max-w-6xl mt-10 mb-20 mx-auto md:auto-rows-[20rem]">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          className={item.className}
        />
      ))}
    </BentoGrid>
  );
}

const items = [
    {
      title: "Unlock Your Potential",
      description: "Embark on a journey to discover your full potential with our innovative courses.",
      header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl ">
                <img className="rounded-xl mx-auto" src="https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png" />
              </div>,
      className: "md:col-span-2",
    },
    {
      title: "Mastering the Digital World",
      description: "Immerse yourself in the digital realm and harness the power of technology to shape your future.",
      header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl ">
      <img className="rounded-xl mx-auto" src="https://cdn-wordpress-info.futurelearn.com/wp-content/uploads/Choosing-the-right-course1-606x316.jpg.optimal.jpg" />
    </div>,
      className: "md:col-span-1",
    },
    {
      title: "Design Your Success Story",
      description: "Craft your success story with the art of design, blending creativity and functionality.",
      header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl ">
      <img className="rounded-xl mx-auto" src="https://www.memberspace.com/wp-content/uploads/2024/03/best-online-course-platforms-1024x536.png" />
    </div>,
      className: "md:col-span-1",

    },
    {
      title: "Connect with Confidence",
      description: "Enhance your communication skills and unlock new opportunities for growth and connection.",
      header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl ">
      <img className="rounded-xl mx-auto" src="https://media.licdn.com/dms/image/D4E12AQH3FAdbh7tu4A/article-cover_image-shrink_720_1280/0/1658849656364?e=2147483647&v=beta&t=pQIj_HqdyxJ6ayhhrUfGbCJfuv8L_XTI21IKVw3xiSg" />
    </div>,
      className: "md:col-span-2",
      
    },
  ];
  
