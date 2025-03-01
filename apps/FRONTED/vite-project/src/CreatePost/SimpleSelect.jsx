// import { useState } from "react";
// import { Combobox, InputBase, useCombobox } from "@mantine/core";

// const groceries = [
//   "private_limited",
//   "public_limited",
//   "trust",
//   "partnership",
//   "proprietorship",
//   "llp",
// ];

// export function SimpleSelect() {
//   const combobox = useCombobox({
//     onDropdownClose: () => combobox.resetSelectedOption(),
//   });

//   const [value, setValue] = useState(null);

//   const options = groceries.map((item) => (
//     <Combobox.Option
//       value={item}
//       key={item}
//       className="px-3 py-2 text-white cursor-pointer rounded-md"
//     >
//       {item}
//     </Combobox.Option>
//   ));

//   return (
//     <div className="grid w-full max-w-sm items-center gap-1.5">
//       <label className="text-sm font-medium text-white">
//         Select businessType <span className="text-red-500">*</span>
//       </label>
//       <Combobox 
//         store={combobox}
//         withinPortal={false}
//         onOptionSubmit={(val) => {
//           setValue(val);
//           combobox.closeDropdown();
//         }}
//       >
//         <Combobox.Target>
//           <InputBase
//             component="button"
//             type="button"
//             pointer
//             rightSection={<Combobox.Chevron />}
//             onClick={() => combobox.toggleDropdown()}
//             rightSectionPointerEvents="none"
//             className="bg-[#3A3A3A] text-white rounded-md px-3 py-2 focus:outline-none w-full text-left"
//           >
//             {value || <span className="text-[#B3B3B3]">Pick value</span>}
//           </InputBase>
//         </Combobox.Target>

//         <Combobox.Dropdown bg="mineShaft.9">
//           <Combobox.Options>{options}</Combobox.Options>
//         </Combobox.Dropdown>
//       </Combobox>
//     </div>
//   );
// }



import { Combobox, InputBase, useCombobox } from "@mantine/core";

const groceries = [
  "private_limited",
  "public_limited",
  "trust",
  "partnership",
  "proprietorship",
  "llp",
];

export function SimpleSelect({ value, onChange }) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const options = groceries.map((item) => (
    <Combobox.Option
      value={item}
      key={item}
      className="px-3 py-2 text-white cursor-pointer rounded-md"
    >
      {item}
    </Combobox.Option>
  ));

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <label className="text-sm font-medium text-white">
        Select businessType <span className="text-red-500">*</span>
      </label>
      <Combobox 
        store={combobox}
        withinPortal={false}
        onOptionSubmit={(val) => {
          onChange(val); // Update parent state
          combobox.closeDropdown();
        }}
      >
        <Combobox.Target>
          <InputBase
            component="button"
            type="button"
            pointer
            rightSection={<Combobox.Chevron />}
            onClick={() => combobox.toggleDropdown()}
            rightSectionPointerEvents="none"
            className="bg-[#3A3A3A] text-white rounded-md px-3 py-2 focus:outline-none w-full text-left"
          >
            {value || <span className="text-[#B3B3B3]">Pick value</span>}
          </InputBase>
        </Combobox.Target>

        <Combobox.Dropdown bg="mineShaft.9">
          <Combobox.Options>{options}</Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </div>
  );
}
