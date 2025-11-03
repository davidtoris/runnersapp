export const NumberFunc = (num:string) => {
    let numRunner;
    if (num?.length === 1) {
      numRunner = '00' + num;
    }
    if (num?.length === 2) {
      numRunner = '0' + num;
    } 
    if (num !== undefined && num.length >= 3) {
      numRunner = num;
    }
    return numRunner;
  };