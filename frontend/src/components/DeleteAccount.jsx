import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteAccount } from "@/services/authService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function DeleteAccount() {
  const navigate = useNavigate();
  async function handleDelete() {
    try {
      let res = await deleteAccount();
      toast.success(res.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error Deleting Account");
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <Button className="bg-red-600 rounded-xl p-5 cursor-pointer">
            Delete Account
          </Button>
        }
      />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Account?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete your account? This action cannot be
            undone. All your transactions and budgets will be permanently
            deleted.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            variant="destructive"
            className="cursor-pointer"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteAccount;
