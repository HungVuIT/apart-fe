import React from 'react';
import Container from '../../../components/Container';
import classes from './new-watch.module.scss';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './customMui.scss';
interface IDataNewWatch {
  createdAt: string
  updatedAt: string
  name: string
  description: string
  content: string
  quantity: number
  saled: number
  price: number
  gender: string
  materialCord: string
  glassSurface: string
  glassSize: string
  brand: string
  madeBy: string
  other: string
  warranty: string
  status: string
  weight: number
  height: number
  width: number
  length: number
}
const schema = yup.object().shape({
});
function NewWatch() {
  const { register, setValue, control, handleSubmit, clearErrors, formState: { errors } } = useForm<IDataNewWatch>({
    resolver: yupResolver(schema)
  });
  const onSubmit: SubmitHandler<IDataNewWatch> = async (_data: IDataNewWatch) => {
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.wrapper + ' new-watch'}>
      <Container className={classes.container}>
        <>
          <div className={classes.title}>Thông tin cơ bản</div>
          <div className={classes.item}>
            <div className={classes['item-title']}>Hình ảnh sản phẩm:</div>
            <div className={classes['item-content']}>Content</div>
          </div>
          <div className={classes.item}>
            <div className={classes['item-title']}>*Tên sản phẩm</div>
            <div className={classes['item-content']}>
              <Controller name='name' control={control}
                render={({
                  field: { onChange, onBlur, value, name, ref },
                  fieldState: { invalid, isTouched, isDirty, error },
                  formState
                }) => (
                  <TextField
                    variant='outlined'
                    {...register('name')}
                    onBlur={onBlur}
                    onChange={onChange}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    className={classes.input}
                  />
                )}
              />
            </div>
          </div>
          <div className={classes.item}>
            <div className={classes['item-title']}>*Đơn giá</div>
            <div className={classes['item-content']}>
              <Controller name='price' control={control}
                render={({
                  field: { onChange, onBlur, value, name, ref },
                  fieldState: { invalid, isTouched, isDirty, error },
                  formState
                }) => (
                  <TextField
                    variant='outlined'
                    {...register('price')}
                    onBlur={onBlur}
                    onChange={onChange}
                    error={!!errors.price}
                    helperText={errors.price?.message}
                    className={classes.input}
                  />
                )}
              />
            </div>
          </div>
          <div className={classes.item + ' ' + classes.mutil}>
            <div className={classes['item-title']}>*Mô tả sản phẩm</div>
            <div className={classes['item-content']}>
              <Controller name='description' control={control}
                render={({
                  field: { onChange, onBlur, value, name, ref },
                  fieldState: { invalid, isTouched, isDirty, error },
                  formState
                }) => (
                  <TextField
                    variant='outlined'
                    {...register('description')}
                    onBlur={onBlur}
                    onChange={onChange}
                    multiline
                    rows={6}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                    className={classes.input}
                  />
                )}
              />
            </div>
          </div>
        </>
      </Container>
      <Container className={classes.container}>
        <>
          <div className={classes.title}>Thông tin chi tiết</div>
          <div className={classes.group + ' group'}>
            <div className={classes.groupLeft}>
              <div className={classes.itemGroup}>
                <div className={classes['itemGroup-title']}>Thương hiệu</div>
                <div className={classes['itemGroup-content']}>
                  <Controller name='brand' control={control}
                    render={({
                      field: { onChange, onBlur, value, name, ref },
                      fieldState: { invalid, isTouched, isDirty, error },
                      formState
                    }) => (
                      <TextField
                        variant='outlined'
                        {...register('brand')}
                        onBlur={onBlur}
                        onChange={onChange}
                        error={!!errors.brand}
                        helperText={errors.brand?.message}
                        className={classes.input}
                      />
                    )}
                  />
                </div>
              </div>
              <div className={classes.itemGroup}>
                <div className={classes['itemGroup-title']}>Chất liệu dây đeo</div>
                <div className={classes['itemGroup-content']}>
                  <Controller name='materialCord' control={control}
                    render={({
                      field: { onChange, onBlur, value, name, ref },
                      fieldState: { invalid, isTouched, isDirty, error },
                      formState
                    }) => (
                      <TextField
                        variant='outlined'
                        {...register('materialCord')}
                        onBlur={onBlur}
                        onChange={onChange}
                        error={!!errors.materialCord}
                        helperText={errors.materialCord?.message}
                        className={classes.input}
                      />
                    )}
                  />
                </div>
              </div>
              <div className={classes.itemGroup}>
                <div className={classes['itemGroup-title']}>Đường kính</div>
                <div className={classes['itemGroup-content']}>
                  <Controller name='glassSize' control={control}
                    render={({
                      field: { onChange, onBlur, value, name, ref },
                      fieldState: { invalid, isTouched, isDirty, error },
                      formState
                    }) => (
                      <TextField
                        variant='outlined'
                        {...register('glassSize')}
                        onBlur={onBlur}
                        onChange={onChange}
                        error={!!errors.glassSize}
                        helperText={errors.glassSize?.message}
                        className={classes.input}
                      />
                    )}
                  />
                </div>
              </div>
              <div className={classes.itemGroup}>
                <div className={classes['itemGroup-title']}>Xuất xứ</div>
                <div className={classes['itemGroup-content']}>
                  <Controller name='madeBy' control={control}
                    render={({
                      field: { onChange, onBlur, value, name, ref },
                      fieldState: { invalid, isTouched, isDirty, error },
                      formState
                    }) => (
                      <TextField
                        variant='outlined'
                        {...register('madeBy')}
                        onBlur={onBlur}
                        onChange={onChange}
                        error={!!errors.madeBy}
                        helperText={errors.madeBy?.message}
                        className={classes.input}
                      />
                    )}
                  />
                </div>
              </div>
              <div className={classes.itemGroup}>
                <div className={classes['itemGroup-title']}>Khác</div>
                <div className={classes['itemGroup-content']}>
                  <Controller name='content' control={control}
                    render={({
                      field: { onChange, onBlur, value, name, ref },
                      fieldState: { invalid, isTouched, isDirty, error },
                      formState
                    }) => (
                      <TextField
                        variant='outlined'
                        {...register('content')}
                        onBlur={onBlur}
                        onChange={onChange}
                        error={!!errors.content}
                        helperText={errors.content?.message}
                        className={classes.input}
                      />
                    )}
                  />
                </div>
              </div>
            </div>
            <div className={classes.groupRight}>
              <div className={classes.itemGroup}>
                <div className={classes['itemGroup-title']}>Hạn bảo hành</div>
                <div className={classes['itemGroup-content']}>
                  <Controller name='warranty' control={control}
                    render={({
                      field: { onChange, onBlur, value, name, ref },
                      fieldState: { invalid, isTouched, isDirty, error },
                      formState
                    }) => (
                      <TextField
                        variant='outlined'
                        {...register('warranty')}
                        onBlur={onBlur}
                        onChange={onChange}
                        error={!!errors.warranty}
                        helperText={errors.warranty?.message}
                        className={classes.input}
                      />
                    )}
                  />
                </div>
              </div>
              <div className={classes.itemGroup}>
                <div className={classes['itemGroup-title']}>Bề mặt</div>
                <div className={classes['itemGroup-content']}>
                  <Controller name='glassSurface' control={control}
                    render={({
                      field: { onChange, onBlur, value, name, ref },
                      fieldState: { invalid, isTouched, isDirty, error },
                      formState
                    }) => (
                      <TextField
                        variant='outlined'
                        {...register('glassSurface')}
                        onBlur={onBlur}
                        onChange={onChange}
                        error={!!errors.glassSurface}
                        helperText={errors.glassSurface?.message}
                        className={classes.input}
                      />
                    )}
                  />
                </div>
              </div>
              <div className={classes.itemGroup}>
                <div className={classes['itemGroup-title']}>Tình trạng</div>
                <div className={classes['itemGroup-content']}>
                  <Controller name='status' control={control}
                    render={({
                      field: { onChange, onBlur, value, name, ref },
                      fieldState: { invalid, isTouched, isDirty, error },
                      formState
                    }) => (
                      <TextField
                        variant='outlined'
                        {...register('status')}
                        onBlur={onBlur}
                        onChange={onChange}
                        error={!!errors.status}
                        helperText={errors.status?.message}
                        className={classes.input}
                      />
                    )}
                  />
                </div>
              </div>
              <div className={classes.itemGroup}>
                <div className={classes['itemGroup-title']}>Giới tính</div>
                <div className={classes['itemGroup-content']}>
                  <Controller name='gender' control={control}
                    render={({
                      field: { onChange, onBlur, value, name, ref },
                      fieldState: { invalid, isTouched, isDirty, error },
                      formState
                    }) => (
                      <TextField
                        variant='outlined'
                        {...register('gender')}
                        onBlur={onBlur}
                        onChange={onChange}
                        error={!!errors.gender}
                        helperText={errors.gender?.message}
                        className={classes.input}
                      />
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      </Container>
      <Container className={classes.container}>
        <>
          <div className={classes.title}>Thông tin vận chuyển</div>
          <div className={classes.group + ' group'}>
            <div className={classes.groupLeft}>
              <div className={classes.itemGroup}>
                <div className={classes['itemGroup-title']}>Cân nặng (sau khi đóng gói)</div>
                <div className={classes['itemGroup-content']}>
                  <Controller name='weight' control={control}
                    render={({
                      field: { onChange, onBlur, value, name, ref },
                      fieldState: { invalid, isTouched, isDirty, error },
                      formState
                    }) => (
                      <TextField
                        variant='outlined'
                        {...register('weight')}
                        onBlur={onBlur}
                        onChange={onChange}
                        error={!!errors.weight}
                        helperText={errors.weight?.message}
                        className={classes.input}
                      />
                    )}
                  />
                </div>
              </div>
              <div className={classes.itemGroup}>
                <div className={classes['itemGroup-title']}>Chiều cao</div>
                <div className={classes['itemGroup-content']}>
                  <Controller name='height' control={control}
                    render={({
                      field: { onChange, onBlur, value, name, ref },
                      fieldState: { invalid, isTouched, isDirty, error },
                      formState
                    }) => (
                      <TextField
                        variant='outlined'
                        {...register('height')}
                        onBlur={onBlur}
                        onChange={onChange}
                        error={!!errors.height}
                        helperText={errors.height?.message}
                        className={classes.input}
                      />
                    )}
                  />
                </div>
              </div>
            </div>
            <div className={classes.groupRight}>
              <div className={classes.itemGroup}>
                <div className={classes['itemGroup-title']}>Rộng</div>
                <div className={classes['itemGroup-content']}>
                  <Controller name='width' control={control}
                    render={({
                      field: { onChange, onBlur, value, name, ref },
                      fieldState: { invalid, isTouched, isDirty, error },
                      formState
                    }) => (
                      <TextField
                        variant='outlined'
                        {...register('width')}
                        onBlur={onBlur}
                        onChange={onChange}
                        error={!!errors.width}
                        helperText={errors.width?.message}
                        className={classes.input}
                      />
                    )}
                  />
                </div>
              </div>
              <div className={classes.itemGroup}>
                <div className={classes['itemGroup-title']}>Dài</div>
                <div className={classes['itemGroup-content']}>
                  <Controller name='length' control={control}
                    render={({
                      field: { onChange, onBlur, value, name, ref },
                      fieldState: { invalid, isTouched, isDirty, error },
                      formState
                    }) => (
                      <TextField
                        variant='outlined'
                        {...register('length')}
                        onBlur={onBlur}
                        onChange={onChange}
                        error={!!errors.length}
                        helperText={errors.length?.message}
                        className={classes.input}
                      />
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      </Container>
      <div className={classes.groupBtn}>
        <Button variant="outlined" className={classes.btn}>Hủy</Button>
        <Button variant="contained" className={classes.btn + ' ' + classes.save}>Thêm sản phẩm</Button>
      </div>
    </form>
  );
}

export default NewWatch;
