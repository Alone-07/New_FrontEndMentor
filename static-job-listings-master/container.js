let container = ({
  id,
  company,
  logo,
  new: fresher,
  featured,
  position,
  role,
  level,
  postedAt,
  contract,
  location,
  languages,
  tools,
} = {}) => {
  let lan = ``;
  languages.forEach((lang) =>
    lang ? (lan += `<li data-language ='${lang}'> ${lang}</li>`) : ""
  );
  let to = ``;
  tools.forEach((tool) =>
    tool ? (to += `<li data-tool ='${tool}'> ${tool}</li>`) : ""
  );
  return `
<div class='card' id="card-${id}" style="${
    fresher && featured ? `border-color: var(--DesaturatedDarkCyan)` : ""
  }" > 
  <div class="imgContainer">
    <img src ="${logo}" alt="${logo} is missing">
  </div>
  <div class="txtContainer">
   <p class="companyDetails">
    <span class="company">${company}</span>
    ${!fresher ? "" : `<span class="new" >NEW!</span>`}
    ${!featured ? "" : `<span class="featured">FEATURED</span>`}
   </p>
   <p class ="position"> ${position} </p>
   <p class ="jobDescription">
    <span class="postedAt"> ${postedAt}</span> . 
    <span class="contract"> ${contract}</span> . 
    <span class="location"> ${location}</span> . 
   </p>
  </div>
    <ul class="tags">
      <li data-role="${role}"> ${role}</li>
      <li data-level="${level}"> ${level}</li>
    ${lan}
    ${to}
    </ul>
</div>
`;
};

export { container };
