
function Bottom({user}) {
  user = user?._id ? user : null;
  return (
    <>
    {!user && 
      <div className="container-fluid py-2 bottom-div ">
        <a href="/signup" className="text-decoration-none">

          <div className="text-white">
            <div className="row mx-1 bottom-bg align-items-center">
              <div className="col text-start">

                Preview of Spotify <br />
                Sign up to get unlimited songs and podcasts with occasional ads.
                No credit card needed.
              </div>

              <div className="col text-end p-2">
                <button
                  type="button"
                  className="btn btn-light rounded-pill signup-btn px-4 fw-bold"
                >
                  Sign up free
                </button>
              </div>
            </div>
          </div>
        </a>
      </div>}
    </>
  );
}

export default Bottom;
