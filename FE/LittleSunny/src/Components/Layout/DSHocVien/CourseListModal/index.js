import { Button, Grid, ListItem, ListItemText, Radio } from '@mui/material';
import React, { useState } from 'react';

function CourseListModal() {
    const course = ['Toán', 'Văn', 'Anh Văn', 'Mỹ Thuật'];
    let courseList = [];

    course.forEach((course, index) => {
        courseList.push(
            <Button key={index} sx={{ minWidth: 100, mx: 1, my: 1 }} size="large" color="success" variant="contained">
                {course}
            </Button>,
        );
    });

    const [left, setLeft] = useState(['Lớp Toán 1', 'Lớp Toán 2', 'Lớp Toán 3']);
    const [right, setRight] = useState(['Lớp Văn 2', 'Lớp Toán 4', 'Lớp A.Văn 1']);
    const [selectedLeft, setSelectedLeft] = useState(null);
    const [selectedRight, setSelectedRight] = useState(null);

    const handleToggleLeft = (value) => () => {
        setSelectedLeft(value === selectedLeft ? null : value);
    };

    const handleToggleRight = (value) => () => {
        setSelectedRight(value === selectedRight ? null : value);
    };

    const handleCheckedRight = () => {
        if (selectedLeft !== null) {
            setRight([...right, selectedLeft]);
            setLeft(left.filter((item) => item !== selectedLeft));
            setSelectedLeft(null);
        }
    };

    const handleCheckedLeft = () => {
        if (selectedRight !== null) {
            setLeft([...left, selectedRight]);
            setRight(right.filter((item) => item !== selectedRight));
            setSelectedRight(null);
        }
    };

    return (
        <Grid container>
            <Grid
                sx={{
                    border: 2,
                    borderColor: 'darkgray',
                    borderRadius: 2,
                }}
                xs={12}
            >
                <fieldset className="mt-4">
                    <legend className="text-center">Danh sách Khóa học</legend>
                </fieldset>
                <Grid mb={2} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                    {courseList}
                </Grid>
            </Grid>
            <Grid mt={3} xs={12}>
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                    <Grid
                        sx={{
                            my: 2,
                            border: 2,
                            borderColor: 'darkgray',
                            borderRadius: 2,
                        }}
                        item
                    >
                        <fieldset className="mt-3">
                            <legend className="text-center">DS lớp của khóa ...</legend>
                        </fieldset>
                        {left.map((value) => (
                            <ListItem key={value} role="listitem" onClick={handleToggleLeft(value)}>
                                <Radio
                                    checked={selectedLeft === value}
                                    onChange={handleToggleLeft(value)}
                                    value={value.toString()}
                                    name="left-radio-buttons"
                                    sx={{ p: 0 }}
                                />
                                <ListItemText primary={` ${value}`} />
                            </ListItem>
                        ))}
                    </Grid>
                    <Grid item>
                        <Grid container direction="column" alignItems="center">
                            <Button
                                sx={{ my: 0.5, fontSize: 14 }}
                                variant="contained"
                                size="small"
                                onClick={handleCheckedRight}
                                disabled={selectedLeft === null}
                                aria-label="move selected right"
                            >
                                &gt;
                            </Button>
                            <Button
                                sx={{ my: 0.5, fontSize: 14 }}
                                variant="contained"
                                size="small"
                                onClick={handleCheckedLeft}
                                disabled={selectedRight === null}
                                aria-label="move selected left"
                            >
                                &lt;
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid
                        sx={{
                            p: 0,
                            my: 2,
                            border: 2,
                            borderColor: 'darkgray',
                            borderRadius: 2,
                        }}
                        item
                    >
                        <fieldset className="mt-3">
                            <legend className="text-center">DS lớp của học viên</legend>
                        </fieldset>
                        {right.map((value) => (
                            <ListItem key={value} role="listitem" onClick={handleToggleRight(value)}>
                                <Radio
                                    checked={selectedRight === value}
                                    onChange={handleToggleRight(value)}
                                    value={value.toString()}
                                    name="right-radio-buttons"
                                    sx={{ p: 0 }}
                                />
                                <ListItemText primary={` ${value}`} />
                            </ListItem>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default CourseListModal;
