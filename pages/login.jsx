import { Form, Input } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginFn } from "../dataFetcher/user";
import { useContext } from "react";
import { AuthContext } from "@/contexts/authContext";
import { useRouter } from "next/router";

function Login() {
  const queryClient = useQueryClient()
  const { setUser, setIsAuthenticated } = useContext(AuthContext);
  const router = useRouter()
  const mutation = useMutation({
    mutationFn: async (values) => {
      const user = await loginFn(values)
      user._id && setUser(user)
      user._id && setIsAuthenticated(true)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users/login'] })
      router.push("/")
    }
  })


  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="hero min-h-screen bg-base-200 ">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <Form
                onFinish={(values) => mutation.mutate(values)}
              >
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your email!',
                      },
                    ]}
                  >
                    <Input className="input input-bordered" placeholder="Email" />
                  </Form.Item>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: 'Password is required!',
                      },
                    ]}
                  >
                    <Input.Password placeholder="Password" className="input input-bordered" />
                  </Form.Item>
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary">Login</button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

}

export default Login;
