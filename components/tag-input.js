import { useEffect, useRef, useState } from "react";

export default function TagInput({
  tagId,
  label,
  initialTags,
  maxTags,
  onTagsChange
}) {
  const tagInputRef = useRef(null);
  const [input, setInput] = useState("");
  const [tags, setTags] = useState([]);
  const [isKeyReleased, setIsKeyReleased] = useState(false);
  const [initialTagsShown, setInitialTagsShown] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleKeyDown = (e) => {
    const { key } = e;
    const trimmedInput = input.trim();

    if (
      key === "," &&
      trimmedInput.length &&
      !tags.includes(trimmedInput) &&
      tags.length < maxTags
    ) {
      e.preventDefault();
      setTags((prevState) => [...prevState, trimmedInput]);
      setInput("");
    }

    if (key === "Backspace" && !input.length && tags.length && isKeyReleased) {
      const tagsCopy = [...tags];
      const poppedTag = tagsCopy.pop();
      e.preventDefault();
      setTags(tagsCopy);
      setInput(poppedTag);
    }

    setIsKeyReleased(false);
  };

  const handleKeyUp = () => {
    setIsKeyReleased(true);
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    if (initialTagsShown) {
      setTags([]);
    }
    setInitialTagsShown(false);
    setInput(value.toLowerCase());
  };

  const handleInputBlur = () => {
    if (
      input.trim().length &&
      !tags.includes(input.trim()) &&
      tags.length < maxTags
    ) {
      setTags((prevState) => [...prevState, input.trim()]);
    }

    if (input === '' && tags.length < 1) {
      setInitialTagsShown(true)
    }

    setInput("");
  };

  const handleInputFocus = () => {
    if (input === '' && tags.length < 1) {
      setInitialTagsShown(false);
    }
  };

  

  const handleTagDoubleClick = (index) => {
    // Create a copy of the tags array
    const newTags = [...tags];
    // Set the edit mode for the specific tag to true
    setIsEditMode(true)
    
    // Update the tags state with the new array
    // setTags(newTags[index]);
  };

  const handleTagChange = (index, event) => {
    // Create a copy of the tags array
    const newTags = [...tags];
    // Update the tag text for the specific tag
    newTags[index] = event.target.value;
    // Update the tags state with the new array
    setTags(newTags);
  };

  const handleTagBlur = (index) => {
    // Create a copy of the tags array
    const newTags = [...tags];
    // Set the edit mode for the specific tag to false
    setIsEditMode(false)
    // Update the tags state with the new array
    // setTags(newTags);
  };

  function updateTags() {
    onTagsChange(tags);
  }

  useEffect(() => {
    updateTags();
  }, [tags])
  

  function onDelete(badgeIndex) {
    setTags(tags?.filter((tag, i) => i !== badgeIndex))
  }

  return (
    <div className="w-full">
      <label className={`block text-gray-700 text-sm-medium mb-1.5 ${!label && 'sr-only'}`} htmlFor={tagId}>
        {label}
        <span className="text-primary-600">*</span></label>
        <div className="flex flex-wrap gap-2 w-full max-w-full h-[84px] bg-white px-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-1 focus:ring-primary-600 shadow-xs">
          {tags.map((tag, badgeIndex) => (
            <div
              key={`badge${badgeIndex + 1}`}
              onDoubleClick={() => handleTagDoubleClick(badgeIndex)}
              className={`text-sm-medium h-7 ${initialTagsShown ? 'text-gray-600' : 'text-gray-900'} text-center inline-flex items-center justify-center gap-1 bg-gray-100 px-3 py-1 rounded-2xl whitespace-nowrap`}
            >
              {/* {isEditMode ? (
                <input
                  type="text"
                  value={`${tag}`}
                  onChange={(event) => handleTagChange(index, event)}
                  onBlur={() => handleTagBlur(index)}
                  className="border-0 bg-none outline-none appearance-none"
                />
              ) : (
                <span>#{tag}</span>
                )} */}
                <span>#{tag}</span>
                <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(badgeIndex);
                    }}
                    className="cursor-pointer"
                  >
                    <path
                      d="M9 3L3 9M3 3L9 9"
                      stroke="#231F20"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
            </div>
          ))}
          {initialTagsShown && initialTags.map((tag, badgeIndex) => (
            <div
              key={`badge${badgeIndex + 1}`}
              className={`text-sm-medium h-7 ${initialTagsShown ? 'text-gray-600' : 'text-gray-900'} text-center inline-flex items-center justify-center gap-1 bg-gray-100 px-3 py-1 rounded-2xl whitespace-nowrap`}
            >
              <span>#{tag}</span>
            </div>
          ))}
          <input
            id={tagId}
            name={tagId}
            type="text"
            placeholder="Enter only 5 tags"
            value={input}
            ref={tagInputRef}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            className="self-start px-0 py-1 min-w-[40%] border-0 focus:ring-0 outline-none text-sm-regular placeholder:pl-2"
          />
        </div>
    </div>
  );
}
