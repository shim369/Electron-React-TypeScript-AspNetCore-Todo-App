interface Props {
  title: string
}

const PageTitle = (props: Props) => {
  return <h2 className="mb-4">{props.title}</h2>
}

export default PageTitle
