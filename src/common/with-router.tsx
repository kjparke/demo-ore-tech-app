import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

interface RouterProps {
  router: {
    location: ReturnType<typeof useLocation>;
    navigate: ReturnType<typeof useNavigate>;
    params: ReturnType<typeof useParams>;
  };
}

interface WithRouterComponentProps {
  [key: string]: any;
}

type ComponentWithRouterProps = React.FunctionComponent<WithRouterComponentProps & RouterProps>;

export const withRouter = (Component: React.FC<WithRouterComponentProps>): ComponentWithRouterProps => {
  const ComponentWithRouterProp: ComponentWithRouterProps = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }
  return ComponentWithRouterProp;
};

export {};
