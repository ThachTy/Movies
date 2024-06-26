import { useState, useRef, Fragment } from 'react';
import { Transition } from 'react-transition-group';
import { styled } from '@mui/system';
import { Snackbar } from '@mui/base/Snackbar';
import { SnackbarCloseReason } from '@mui/base/useSnackbar';
import { useDispatch, useSelector } from 'react-redux';
import { noficationType, setNoficationAction } from '@config/reducer/noficationReducer';



export default function Nofication() {
  const [exited, setExited] = useState(true);
  const dispatch = useDispatch();
  const nodeRef = useRef(null);

  const { isOpen, message, error }: noficationType = useSelector((state: any) => state.noficationReducer as noficationType);
  const handleClose = (_: any, reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(setNoficationAction({ isOpen: false, message: '', error: false }));
  };

  // const handleClick = () => {
  //   setOpen(isOpen);
  // };

  const handleOnEnter = () => {
    setExited(false);
  };

  const handleOnExited = () => {
    setExited(true);
  };

  return (
    <Fragment>
      <StyledSnackbar
        autoHideDuration={2000}
        open={isOpen}
        onClose={handleClose}
        exited={exited}
      >
        <Transition
          timeout={{ enter: 400, exit: 400 }}
          in={isOpen}
          appear
          unmountOnExit
          onEnter={handleOnEnter}
          onExited={handleOnExited}
          nodeRef={nodeRef}
        >
          {(status) => (
            <SnackbarContent
              style={{
                transform: positioningStyles[status],
                transition: 'transform 300ms ease',
              }}
              ref={nodeRef}
            >
              <div className="snackbar-title">
                {
                  error ? (<i className="fa-solid fa-circle-exclamation mr-2" style={{ color: "#ff0000" }}></i>) : (<i className="fa-solid fa-circle-check mr-2" style={{ color: "#63E6BE" }}></i>)
                }
                <span>
                  {message}
                </span>
              </div>
              <button onClick={handleClose} type='button'><i className="fa-solid fa-xmark"></i></button>
            </SnackbarContent>
          )}
        </Transition>
      </StyledSnackbar>
    </Fragment >
  );
}


const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};


const StyledSnackbar = styled(Snackbar)`
  position: fixed;
  z-index: 5500;
  display: flex;
  bottom: 16px;
  right: 16px;
`;

const SnackbarContent = styled('div')(
  ({ theme }) => `
  position: relative;
  overflow: hidden;
  z-index: 5500;
  display: flex;
  left: auto;
  justify-content: space-between;
  max-width: 560px;
  min-width: 300px;
  background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border-radius: 8px;
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: ${theme.palette.mode === 'dark'
      ? `0 2px 8px rgb(0 0 0 / 0.5)`
      : `0 2px 8px ${grey[200]}`
    };
  padding: 0.75rem;
  color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]};
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 600;

  & .snackbar-title {
    margin-right: 0.5rem;
  }

  & .snackbar-close-icon {
    cursor: pointer;
    font-size: 10px;
    width: 1.25rem;
    height: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  `,
);

const positioningStyles = {
  entering: 'translateX(0)',
  entered: 'translateX(0)',
  exiting: 'translateX(500px)',
  exited: 'translateX(500px)',
  unmounted: 'translateX(500px)',
};