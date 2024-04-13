function updateUserRoute({ body, params }) {
  const { name, email, password } = body;
  const { id } = params;

  updateUserController({ body: { name, email, password }, params: { id } });
}

function updateUserController({
  body: { name, email, password },
  params: { id },
}) {
  userRepository.update({ body: { name, email, password }, params: { id } });
}

const userRepository = {
  update: ({ body: { name, email, password }, params: { id } }) => {},
};
