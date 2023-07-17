export const filteredData =
  (additionalFilters, additionalFilterValues) => (data) => {
    const finalFilterFn =
      additionalFilters &&
      additionalFilters.reduce(
        (prev, current, index) =>
          additionalFilterValues && additionalFilterValues[index]
            ? (x) => current.filter(x) || prev(x)
            : prev,
        (x) => false
      );
    return data.filter(finalFilterFn);
  };
