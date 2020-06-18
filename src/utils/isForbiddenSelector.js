const today = new Date();
const currentMonth = today.getMonth();
const currentYear = today.getFullYear();

function isForbiddenSelector (state, props) {
  const { previousScrollRange, forwardScrollRange } = props;
  const deltaMonth = ((state.currentYear - currentYear) * 12) + (state.currentMonth - currentMonth);

  const isPreviousScrollForbidden = (
    previousScrollRange !== undefined &&
    -deltaMonth >= previousScrollRange
  );
  const isForwardScrollForbidden = (
    forwardScrollRange !== undefined &&
    deltaMonth >= forwardScrollRange
  );

  return [isPreviousScrollForbidden, isForwardScrollForbidden];
}

export default isForbiddenSelector;
