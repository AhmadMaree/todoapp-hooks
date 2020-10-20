import React from 'react';
import classes from './Modal.module.css';

import Modal from '@material-ui/core/Modal';

const ModalUI = props =>  {

        return(
            <Modal
            open={props.open}
            onClose={props.onClose}
          >
           <div className={classes.Modal}  
                    style ={{
                        transform :props.show ? 'translateY(0)' : 'translateY(-100vh)' ,
                        opacity :props.show ? '1' : '0' ,
                    }}  
                > 
                       <p>{props.children}</p> 
                </div>
           
          </Modal>
           
        );
}                                                                                                               
export default React.memo(ModalUI, (prevProps,nextProps) => 
         nextProps.show === prevProps.show || 
         nextProps.children === prevProps.children
);