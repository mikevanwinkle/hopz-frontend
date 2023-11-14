<script>
  import Signup from "$lib/components/Signup.svelte";
  import Login from "$lib/components/Login.svelte";
  import Tabs from "$lib/components/Tabs.svelte";
  import { store, errors, messages } from '$lib/stores';
  import { redirect } from "@sveltejs/kit";
  import { Jumper } from "svelte-loading-spinners";
    import { onMount } from "svelte";
  export let form;
  export let data;

  console.log("Data", data)
  console.log("Form", form)

  if (form?.success && form?.token) {
    console.log("Redirecting")
    redirect(301, `/account?token=${form.token}&sessionid=${data.device_id}`)
  }

  if (data?.token) {
    redirect(301, `/account?token=${data.token}&sessionid=${data.device_id}`)
  }

  let activeTaValue = form?.action && form.action == 'register' ? 2 : 1;

  const items = [
    {
      label: "Login",
      value: 1,
      component: Login,
      props: {
        form: form,
        data: data,
      }
    },
    {
      label: "Register",
      value: 2,
      component: Signup,
      props: {
        form: form,
        data: data,
      }
    },
  ]
</script>

<Tabs {items} activeTabValue={activeTaValue} />

