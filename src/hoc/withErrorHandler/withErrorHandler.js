import React from 'react'
import Modal from '../../components/UI/Modal/Modal';
import useHttpClient from '../../custom-hooks/httpErrorHandler';

const withErrorHandler = (WrappedComponent , axios) => {

    return props => {

        const [DataRequst , errorConfirmedHandler] = useHttpClient(axios);

            return (
                <React.Fragment>
                     <Modal
                            show ={DataRequst.error}
                             open={DataRequst.open}
                             onClose={errorConfirmedHandler}>
                                 {DataRequst.error ? DataRequst.error.message : null}
                     </Modal>
                    <WrappedComponent {...props}/>
                </React.Fragment>
            )
        }
}
export default withErrorHandler;