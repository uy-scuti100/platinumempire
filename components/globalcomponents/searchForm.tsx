// "use client";
// // import icons
// import { useState, useEffect } from "react";

// import { FiSearch } from "react-icons/fi";

// import { usePathname, useRouter } from "next/navigation";

// import {} from "react-icons";
// const SearchForm = ({ isAboveLimit }: { isAboveLimit: boolean }) => {
//    const navigate = useRouter();
//    const pathname = usePathname();

//    const [searchTerm, setSearchTerm] = useState("");
//    const [isLoading, setIsLoading] = useState(false);
//    useEffect(() => {
//       const timeout = setTimeout(() => {
//          setIsLoading(false);
//       }, 1000);
//       return () => clearTimeout(timeout);
//    });

//    const handleSearch = (e: any) => {
//       e.preventDefault();
//       setSearchTerm(e.target.value);
//    };
//    const handleSubmit = (e: any) => {
//       e.preventDefault();
//       // console.log(searchTerm);
//       if (searchTerm.length > 0) {
//          navigate.push(`/search?query=${searchTerm}`);
//          setSearchTerm("");
//       } else {
//          setIsLoading(true);
//       }
//    };
//    return (
//       <form
//          className={`${
//             isLoading ? "animate-shake" : "animate-none"
//          } w-full relative`}
//          onSubmit={handleSubmit}>
//          <input
//             onChange={handleSearch}
//             value={searchTerm}
//             type="text"
//             className={`input outline-none bg-transparent text-black border-accent backdrop-blur-xl ${
//                isAboveLimit || pathname !== "/"
//                   ? "placeholder:text-black border-b border-black border"
//                   : "placeholder:text-white"
//             }`}
//             placeholder="Search for a product"
//          />
//          <button
//             type="submit"
//             className="btn btn-custom absolute top-0 right-0 rounded-none-tl-none rounded-none-bl-none">
//             <FiSearch size={24} style={{ color: "white" }} />
//          </button>
//       </form>
//    );
// };

// export default SearchForm;
