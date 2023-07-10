import * as React from "react";
import Cta from "./Cta";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

import Logo from "../assets/images/Logo.svg";

export interface HeaderProps {
  _site: any;
  headerData?: any;
}


// const navigation = [
//   { name: "MOTORCYCLES", href: "/" },
//   { name: "SCOOTERS", href: "#" },
//   { name: "EXCHANGE", href: "#" },
//   { name: "SERVICES", href: "#" },
//   { name: "GOODLIFE", href: "#" },
//   { name: "COMPANY", href: "#" },
// ];




const Header = (headerData: HeaderProps) => {

  // console.log("headerdata",headerData?._site?.headerMenuLinks);
  
  const navigation = headerData?._site?.headerMenuLinks;

  return (
    <Disclosure as="nav" className="bg-white shadow border-y-8 border-[#243c5a] ">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-15 justify-between">
              <div className="flex">
                <div className="-ml-2 mr-2 flex items-center md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="block lg:hidden"
                    src={Logo}
                    alt="Your Company"
                    width="100"
                    height="100"
                  />
                  <img
                    className="hidden lg:block"
                    src={Logo}
                    alt="Your Company"
                    width="50"
                    height="50"
                  />
                </div>
                <div className="hidden md:ml-6 md:flex md:space-x-4">
                  {navigation?.map((data:any,index:number) => (
                    <Cta
                      key={index}
                      buttonText={data.label}
                      url={data.link}
                      style="inline-flex items-center border-b-4 rounded-none border-transparent hover:border-orange"
                    />
                  ))}
                </div>
              </div>
              <div className="flex items-center">
                <Cta
                  buttonText="Book Now"
                  url="#"
                  style="text-white bg-[#f21826] shadow-md"
                />
              </div> 
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 pt-2 pb-3">
            {navigation?.map((data:any,index:number) => (
                <Disclosure.Button
                key={index}
                  as="a"
                  href={data.link}
                  className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6"
                >
                 {data.label}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Header;
