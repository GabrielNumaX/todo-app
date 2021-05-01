export function comparerIs(otherArray){
    return function(current){
      return otherArray.filter(function(other){
          // console.log('comparer');

          const otherDate = new Date(other.date).getTime();
          const currentDate = new Date(current.date).getTime();

          return otherDate === currentDate;

      }).length === 0;
    }
  }

  export function comparerNot(otherArray){
    return function(current){
      return otherArray.filter(function(other){
          // console.log('comparer');

          const otherDate = new Date(other.date).getTime();
          const currentDate = new Date(current.date).getTime();

          return otherDate !== currentDate;

      }).length === 0;
    }
  }