const orderPeopleTables = async (peopleList: Person[]) => {
    const sortedPeople = peopleList.sort((a, b) => {
        // Check for null values and move them to the end
        if (a.name === null && b.name !== null) {
            return 1;
        }
        if (a.name !== null && b.name === null) {
            return -1;
        }
        // If both names are null or both are not null, sort alphabetically
        if (a.name !== null && b.name !== null) {
            return a.name.localeCompare(b.name);
        }
        return 0;
    });

    return sortedPeople;
};

export default orderPeopleTables;