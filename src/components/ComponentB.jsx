import { useToggle } from '../hooks/useToggle.js';

const ComponentB = () => {
  const { isOpen, open, close } = useToggle();

  return (
    <>
      <button onClick={open}>Open sidebar</button>
      <Sidebar isOpen={isOpen} onClose={close} />
    </>
  );
};

export default ComponentB;
