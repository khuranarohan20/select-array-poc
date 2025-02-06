import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import AddButton from "./AddButton";
import DeleteButton from "./DeleteButton";

const options = ["Facebook", "Twitter", "Google", "Linkedin"];

const validationSchema = Yup.object().shape({
  finalValues: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("Name is required"),
      value: Yup.string().required("Value is required"),
    })
  ),
});

const Combiner = () => {
  const [print, setPrint] = useState(false);
  const [finalValues, setFinalValues] = useState<
    { name: string; value: string }[]
  >([]);

  return (
    <div className="d-flex flex-column gap-2">
      <Formik
        initialValues={{
          finalValues: [
            {
              name: "Facebook",
              value: "",
            },
          ],
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          setFinalValues(values.finalValues.filter((v) => v.value !== ""));
          setPrint(true);
        }}
      >
        {({ values, handleSubmit }) => (
          <Form>
            <FieldArray name="finalValues">
              {({ push, remove }) => (
                <div className="d-flex flex-column gap-2">
                  {values.finalValues.map((_, idx) => (
                    <div
                      className="d-flex w-100 justify-content-center align-items-center gap-2"
                      key={idx}
                    >
                      <Field
                        as="select"
                        name={`finalValues[${idx}].name`}
                        className="form-select"
                      >
                        {options.map((option, i) => (
                          <option key={i} value={option}>
                            {option}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name={`finalValues[${idx}].name`}
                        component="div"
                        className="text-danger"
                      />

                      <div className="position-relative w-100">
                        <Field
                          type="text"
                          onKeyDown={(e: any) => {
                            if (
                              e.key === "Enter" &&
                              idx === values.finalValues.length - 1 &&
                              values.finalValues[idx].value !== ""
                            ) {
                              push({ name: "Facebook", value: "" });
                            }
                          }}
                          name={`finalValues[${idx}].value`}
                          placeholder="Enter your value"
                          className="form-control"
                        />
                        <ErrorMessage
                          name={`finalValues[${idx}].value`}
                          component="div"
                          className="text-danger position-absolute end-0 bottom-20"
                        />
                      </div>

                      {values.finalValues.length !== 1 && (
                        <DeleteButton onClick={() => remove(idx)} />
                      )}
                      <div className="d-flex gap-2">
                        {idx === values.finalValues.length - 1 && (
                          <AddButton
                            onClick={() => {
                              if (values.finalValues[idx].value !== "")
                                push({ name: "Facebook", value: "" });
                            }}
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </FieldArray>

            <div className="d-grid gap-2 col-6 mx-auto mt-3">
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => {
                  handleSubmit();
                }}
              >
                Button
              </button>
            </div>
          </Form>
        )}
      </Formik>

      {print && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Value</th>
            </tr>
          </thead>
          <tbody>
            {finalValues.map((v, idx) => (
              <tr key={idx}>
                <th scope="row">{idx + 1}</th>
                <td>{v.name}</td>
                <td>{v.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Combiner;
