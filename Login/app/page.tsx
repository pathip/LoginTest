"use client";

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Form, Input, Button, Modal } from 'antd';
import { ConfigProvider } from 'antd';

type FormData = {
  username: string;
  password: string;
};

export default function Home() {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loginData, setLoginData] = useState<FormData | null>(null);

  const onSubmit = (data: FormData) => {
    // Simulate login success
    setLoginData(data);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  return (
    <ConfigProvider>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Form.Item
              label="Username"
              validateStatus={errors.username ? 'error' : ''}
              help={errors.username?.message}
            >
              <Controller
                name="username"
                control={control}
                rules={{ required: 'Username is required' }}
                render={({ field }) => <Input {...field} />}
              />
            </Form.Item>
            <Form.Item
              label="Password"
              validateStatus={errors.password ? 'error' : ''}
              help={errors.password?.message}
            >
              <Controller
                name="password"
                control={control}
                rules={{ required: 'Password is required' }}
                render={({ field }) => <Input.Password {...field} />}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="w-full">
                Login
              </Button>
            </Form.Item>
          </form>
        </div>
        <Modal
          title="Login Success"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleOk}
        >
          <pre>{JSON.stringify(loginData, null, 2)}</pre>
        </Modal>
      </div>
    </ConfigProvider>
  );
}
