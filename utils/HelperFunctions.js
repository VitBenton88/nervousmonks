const HelperFunctions = {
    showArrFormatter: (shows, admin) => {
        let showsArr = [];
      
        for (let i = 0; i < shows.length; i++) { 
          const { id, location, date, link } = shows[i];
          const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
          const dateToPrint = date.toLocaleDateString("en-US", options)
          const currentShowObjFormatted = {id, location, date, dateToPrint, link, admin}
          showsArr.push(currentShowObjFormatted);
        }
        return showsArr;
      }
  };

// Export the helper function object
module.exports = HelperFunctions;