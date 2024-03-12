import React, { Fragment, useState } from 'react';
import Container from '../../components/container/Container';
import FlexBox from '../../components/flexBox/FlexBox';
import Typography from '../../components/text/Typography';
import Spacer from '../../components/spacer/Spacer';
import InputField from '../../components/inputField/InputField';
import Button from '../../components/button/Button';
import { useNavigate } from 'react-router-dom';
import DashboardNavbar from '../../components/dashboardNavbar/DashboardNavbar';
import './CreateCampaignPage.css';
import TypographySizes from '../../TypographySizes';
import { Colors } from '../../colors';

interface CampaignData {
    title: string;
    description: string;
    startDate: string;
}

const CreateCampaignPage = () => {
  const [campaignData, setCampaignData] = useState({
    title: '',
    description: '',
    startDate: '',
  });

  const [errors, setErrors] = useState({
    title: '',
    description: '',
    startDate: '',
  });

  const validateInput = (name: string, value: any) => {
    switch (name) {
      case 'title':
        if (!value) {
          setErrors(prevErrors => ({ ...prevErrors, title: 'Title cannot be empty' }));
        } else {
          setErrors(prevErrors => ({ ...prevErrors, title: '' }));
        }
        break;
      case 'description':
        if (!value) {
          setErrors(prevErrors => ({ ...prevErrors, description: 'Description cannot be empty' }));
        } else {
          setErrors(prevErrors => ({ ...prevErrors, description: '' }));
        }
        break;
      case 'image':
        if (!value) {
          setErrors(prevErrors => ({ ...prevErrors, image: 'An image is required' }));
        } else {
          setErrors(prevErrors => ({ ...prevErrors, image: '' }));
        }
        break;
      // Add more cases as needed
      default:
        break;
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setCampaignData(prevData => ({
      ...prevData,
      [name]: value,
    }));
    validateInput(name, value);
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    setCampaignData(prevData => ({
      ...prevData,
      image: file,
    }));
    validateInput('image', file);
  };

  const isFormValid = () => {
    // Check for any errors in the errors state
    return Object.values(errors).every(error => error === '');
  };

  const navigate = useNavigate();
  const onSubmit = async () => {
    if (isFormValid()) {
      // redirect to the campaign page and call the new game workflow there 
      return navigate(`/campaign?name=${campaignData.title}&description=${campaignData.description}`);
    }
  }

  return (
    <Fragment>
        <DashboardNavbar />
        <Container className='create-container'>

            <Typography color={Colors.WHITE} alignment="center" size="xlarge" weight="bold">Create a New Campaign</Typography>
            <Spacer direction="vertical" size={30} />
            <InputField
                type="text"
                header="Campaign Title"
                name="title"
                required
                onChange={handleChange}
                error={errors.title}
            />
            <Spacer direction="vertical" size={30} />
            <InputField
                type="textarea"
                header="Campaign Description"
                name="description"
                required
                onChange={handleChange}
                error={errors.description}
            />
            <Spacer direction="vertical" size="20px" />
            <Button type="Primary" size="Medium" onClick={onSubmit}>Create Campaign</Button>

        </Container>
    </Fragment>
  );
};

export default CreateCampaignPage;
