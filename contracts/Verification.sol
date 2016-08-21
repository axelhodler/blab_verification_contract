contract Verification {
  mapping (string => Report) reports;

  struct Report {
    address[] validators;
    bool isValid;
  }

  function verify(string reportId) {
    if(!reports[reportId].isValid) {
      reports[reportId].validators.push(msg.sender);
    }
    if(reports[reportId].validators.length == 3) {
      reports[reportId].isValid = true;
    }
  }

  function verifiersFor(string reportId) constant returns(address[] addresses) {
    return reports[reportId].validators;
  }
}
