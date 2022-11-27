import Form from "../common/form";
import Joi from "joi";
import { getCategory, saveCategory } from "../../services/categoryService";

class CategoryForm extends Form {
  state = {
    data: {
      name: "",
    },
    errors: {},
  };

  schema = Joi.object({
    _id: Joi.string(),
    name: Joi.string().min(3).max(50).required().label("Category"),
  });

  async componentDidMount() {
    this.populateCategory();
  }

  async populateCategory() {
    try {
      const categoryId = this.props.match.params.id;
      if (categoryId === "new") return; //it is ready to take new input
      const { data: category } = await getCategory(categoryId);

      this.setState({ data: this.mapToViewModel(category) });
    } catch (ex) {
      if (ex.response || ex.response.status === 404)
        this.props.history.replace("/not-found");
      console.log(ex);
    }
  }

  mapToViewModel(category) {
    return {
      _id: category._id,
      name: category.name,
    };
  }
  async doSubmit() {
    console.log(this.state.data);
    const res = await saveCategory(this.state.data);
    if (res.status === 200) {
      alert("Category Successfully Managed");
      this.props.history.push("/admin/category/manage");
    } else {
      alert("Problem in to save data in backend");
    }
  }
  render() {
    return (
      <div>
        <h1>Category Form</h1>

        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Category")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default CategoryForm;
