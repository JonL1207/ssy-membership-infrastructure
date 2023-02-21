// Format each users membership number based on their initails, the party initials,
// an incremental number starting from 10000 and the current year
module.exports = formatMembershipNumber= (firstInitial, lastInitial, previousMembershipNumber) => {
    const firstNameInitial = firstInitial.slice(0, 1);
    const lastNameInitial = lastInitial.slice(0, 1);
    const party = 'SSY';
    const defaultMembershipNumber = '10000';
    const year = new Date().getFullYear().toString().slice(2);
    
    if(previousMembershipNumber.length === 0){
        return firstNameInitial.concat(lastNameInitial, party, defaultMembershipNumber, year);
    };

    const membershipNumber = previousMembershipNumber[0].membershipNumber.slice(5, -2);
    const increment = parseInt(membershipNumber) + 1;

    return firstNameInitial.concat(lastNameInitial, party, increment, year);
};