import React from 'react';
import { AspectRatio, Card, Grid, Sheet, Stack, Typography, useTheme } from '@mui/joy';
import Spacer from '../../../../components/spacer/Spacer';

interface ValuePropProps {
    images: string[];
    title: string;
    bodyText: string;
    isTextLeft: boolean;
}

const ValueProp: React.FC<ValuePropProps> = ({ images, title, bodyText, isTextLeft }) => {
    const theme = useTheme();

    return (
        <Sheet variant={isTextLeft ? "plain" : "soft"}
            sx={{
                minHeight: "50vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                padding: "36px 20px",
            }}
        >
            <Stack direction={"row"} spacing={0}
            sx={{
                height: "100%",
                width: "80%",
                justifyContent: "center",
                alignItems: "center",
                padding: "0 20px",
                [theme.breakpoints.down('md')]: {
                    width: "100%",
                    flexDirection: "column",
                },
            }}
            >
                <Stack spacing={0} sx={{
                    width: "500px",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    padding: "0 20px",
                    [theme.breakpoints.down('sm')]: {
                        width: "250px",
                    },
                }}>
                    <Typography level="h2">{title}</Typography>
                    <Typography level="body-md">{bodyText}</Typography>
                </Stack>
                <Spacer direction="horizontal" size="50px" />
                <Grid container spacing="20px" sx={{
                    width: "500px",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    padding: "0 20px",
                    [theme.breakpoints.down('md')]: {
                        width: "400px",
                    },
                    [theme.breakpoints.down('sm')]: {
                        width: "300px",
                    },
                }}>
                    {images.map((image) => (
                    <Grid xs={images.length == 1 ? 12 : 6}>
                        <Card variant="plain"
                        sx={{
                            backgroundColor: "transparent",
                            padding: "0",
                            }}>
                            {/* <img src={image} alt="Value Prop Image" /> */}
                            <img src={image} alt="Value Prop Image"/>
                        </Card>
                    </Grid>
                    ))}
                </Grid>
            </Stack>
        </Sheet>
    );
}

export default ValueProp;
